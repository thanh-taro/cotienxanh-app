import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
import GameTwoSubOneScene from './GameTwoSubOneScene'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import FormingAStoryGuideSound from '../components/FormingAStoryGuideSound'
import DiamondBadge from '../components/DiamondBadge'
import Cards from '../components/Cards'
import store from 'store'

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

    const noGuide = store.get(FormingAStoryScene.KEY)
    if (!noGuide) {
      store.set(FormingAStoryScene.KEY, 1)
      this.playGuideSound()
    }
    this.things.noGuide = noGuide

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  generate () {
    const level = this.things.level
    const total = level === 'easy' ? 4 : 5
    var question = randItem(this.things.stories[level])
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
  }

  configTheQuestionCard(number, total) {
    const level = this.things.level
    const { assetWidth, assetHeight } = HorizontalCards.ASSETSPEC
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
    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  createTheDragFeature() {
    this.input.dragDistanceThreshold = 16;
    this.input.on('dragstart', function (pointer, gameObject) {
      this.stopGuideSound()
      this.things.originalX = gameObject.x
      this.things.originalY = gameObject.y
    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on('dragend', function (pointer, gameObject) {
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
    }, this);
  }

  checkAnswers() {
    var isWin =true
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

    this.things.backButton = new BackButton(this, GameTwoSubOneScene.KEY, () => {
      this.stopGuideSound()
    }, true, {}, true)
  }

  playGuideSound () {
    this.things.guideSound = this.sound.add(FormingAStoryGuideSound.KEY)
    this.things.guideSound.play({ delay: 1.5 })
    this.things.delay = (this.things.guideSound.duration + 1.5) * 1000
  }

  stopGuideSound () {
    if (this.things.guideSound) this.things.guideSound.stop()
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
    let questionCards = this.things.questionCards
    // Disable dragging
    for (let index in questionCards) {
      questionCards[index].input.draggable = false
    }
    this.stopGuideSound()
    this.showBottomBar()
    this.time.delayedCall(30000, () => {
      this.scene.stop()
      this.scene.start(GameTwoSubOneScene.KEY, {from: FormingAStoryScene.KEY, coin: FormingAStoryScene.WIN_DIAMOND})
    })

  }

  showBottomBar () {
    let y = this.cameras.main.height / 4 * 3
    // create panel
    this.things.pannel = this.add.rectangle(0, y, this.cameras.main.width, 150, 0xF9A825)
    this.things.pannel.setOrigin(0, 0.5)

    // add sound image
    let data = []
    let { assetHeight } = Cards.ASSETSPEC
    data.x = this.cameras.main.width - 250
    data.y = y
    data.scale = 200 / assetHeight
    data.hasSound = false
    const card = new Cards(this, 'speakerI', 0, data, false, true, {})

    this.createNextButton(y)

  }

  createNextButton (y) {
    destroyObject(this.things.nextButton)
    let data = []
    data.x = this.cameras.main.width - 100
    data.y = y
    this.things.nextButton = new NextButton(this, data, () => {
      this.scene.start(GameTwoSubOneScene.KEY, {from: FormingAStoryScene.KEY, coin: FormingAStoryScene.WIN_DIAMOND})
    })
  }
}
export default FormingAStoryScene
