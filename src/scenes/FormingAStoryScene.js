import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import Cards from '../components/Cards'
import MainGameScene from './MainGameScene'
import { destroyObject, randItem, randSplice } from '../helpers'
import AskSound from '../components/AskSound'

class FormingAStoryScene extends Phaser.Scene {
  static get KEY () {
    return 'FormingAStoryScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: FormingAStoryScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      stories: {
        'easy': ['story_1', 'story_2', 'story_6', 'story_7'],
        'normal': ['story_3', 'story_4']
      }
    }
    this.cameras.main.setBackgroundColor('#AED581')

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  generate () {
    const level = this.things.level
    const total = level === 'easy' ? 4 : 5

    const question = randItem(this.things.stories[level])
    const sound = this.sound.add(HorizontalCards.KEY + '-' + question + '-sound')

    this.things.questionCards = []

    var arrayIndex = []
    for (let i = 0; i < total; i++) {
      let key = question + '_' + (i + 1)
      const config = this.configTheQuestionCard(i, total)
      let card = new HorizontalCards(this, key, config.x, config.y, config.scale, 1, false, false, true, {}, true)
      card.number = i
      this.things.questionCards.push(card)
      this.input.setDraggable(card)
      arrayIndex.push(i)
    }

    // randSplice questionCards
    for (let i = 0; i < total; i++) {
      let realNumber = randSplice(arrayIndex)
      const config = this.configTheQuestionCard(realNumber, total)
      let card = this.things.questionCards[i]
      card.x = config.x
      card.y = config.y
      card.realNumber = realNumber
    }
    this.createTheDragFeature()

    this.things.sound = sound
    // this.things.speaker = new Cards(this, 'speakerI', 0, { x: this.cameras.main.width * 0.9, y: this.cameras.main.height * 0.9, scale: 0.5, hasSound: false, allowClick: true }, null, true, {}, () => this.things.sound.play())
  }

  configTheQuestionCard (number, total) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSET_SPEC
    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - startX
    const width = (endX - startX) / total
    const height = this.cameras.main.height / 2
    const scaleX = (width - padding) / assetWidth
    const scaleY = height / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt((startX + padding / 2 + (number * width) + width / 2))
    const y = this.cameras.main.centerY

    return { x, y, scale }
  }

  createTheDragFeature () {
    this.input.dragDistanceThreshold = 16
    this.input.on('dragstart', (pointer, gameObject) => {
      this.things.sound.stop()
      this.children.bringToTop(gameObject)
      this.things.originalX = gameObject.x
      this.things.originalY = gameObject.y
    })

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.input.on('dragend', (pointer, gameObject) => {
      var questionCards = this.things.questionCards
      let minY = this.cameras.main.centerY - gameObject.displayHeight / 2
      let maxY = this.cameras.main.centerY + gameObject.displayHeight / 2
      var isSwap = false
      if (pointer.y > minY && pointer.y < maxY) {
        for (let index in questionCards) {
          let card = questionCards[index]
          if (card.realNumber !== gameObject.realNumber) {
            let minX = card.x - card.displayWidth / 2
            let maxX = card.x + card.displayWidth / 2
            if (pointer.x > minX && pointer.x < maxX) {
              // swap position
              gameObject.x = card.x
              gameObject.y = card.y
              card.x = this.things.originalX
              card.y = this.things.originalY

              // swap real number
              let intermediary = gameObject.realNumber
              gameObject.realNumber = card.realNumber
              card.realNumber = intermediary
              isSwap = true
              break
            }
          }
        }
      }
      if (!isSwap) {
        gameObject.x = this.things.originalX
        gameObject.y = this.things.originalY
      }

      this.checkAnswers()
    })
  }

  checkAnswers () {
    var isWin = true
    var questionCards = this.things.questionCards
    for (let index in questionCards) {
      let card = questionCards[index]
      if (card.number !== card.realNumber) {
        isWin = false
        break
      }
    }

    if (isWin) this.won()
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, MainGameScene.KEY)
  }

  playRightSound (delay = 0) {
    if (this.things.rightSound === undefined) this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay })
  }

  playWrongSound (delay = 0) {
    if (this.things.wrongSound === undefined) this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay })
  }

  stopWrongSound () {
    if (this.things.wrongSound) this.things.wrongSound.stop()
  }

  won () {
    this.playRightSound()
    this.sound.add(AskSound.KEY).play({ delay: 1.2 })

    let questionCards = this.things.questionCards
    // Disable dragging
    for (let index in questionCards) questionCards[index].input.draggable = false

    this.time.delayedCall(30000, () => {
      this.scene.stop()
      this.scene.resume(MainGameScene.KEY, { from: FormingAStoryScene.KEY, diamond: FormingAStoryScene.WIN_DIAMOND })
    })
  }
}
export default FormingAStoryScene
