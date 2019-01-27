import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import FreeSizeCard from '../components/FreeSizeCard'
import Cards from '../components/Cards'
import RightSound from '../components/RightSound'
import MainGameScene from './MainGameScene'
import WrongSound from '../components/WrongSound'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'
import bookContent from '../app/asset/content/bookContent'

class MoveTheTmagesToTheRightPositionsScene extends Phaser.Scene {
  static get KEY () {
    return 'MoveTheTmagesToTheRightPositionsScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: MoveTheTmagesToTheRightPositionsScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      data: bookContent,
      questions: ['sach_1'],
      kind_of_questions: ['bia_sau']
    }
    this.cameras.main.setBackgroundColor('#5f82ea')


    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
    this.createTheDragFeature()
  }

  generate () {
    this.things.questionCards = []
    const level = this.things.level
    let question = randItem(this.things.questions)
    let type = level !== 'hardest' ? randItem(this.things.kind_of_questions) : 'trang'
    let answersData = this.things.data[question][type]

    var key = question + '_' + type
    this.things.questionKey = key
    var card;
    switch (level) {
      case 'normal':
        this.things.questionSound = this.sound.add(FreeSizeCard.KEY + '-' + type + '-sound')
        this.createSpeaker()
        var data = this.configTheQuestionCard(0, 1)
        card = new FreeSizeCard(this, key, data, false)
        this.things.questionCards.push(card)
        break
      case 'hard':
        var data = this.configTheQuestionCard(0, 1)
        card = new FreeSizeCard(this, key, data, false)
        this.things.questionCards.push(card)
        break
      case 'hardest':
        let arrayKeys = Object.keys(answersData)
        let page = randItem(arrayKeys.splice(1, arrayKeys.length - 1))
        var pages = [page - 1, page]

        for (let i = 0; i < pages.length; i++) {
          var data = this.configTheQuestionCard(i, pages.length)
          card = new FreeSizeCard(this, key + '_' + pages[i], data, false)
          this.things.questionCards.push(card)
        }

        break
      default:
        this.things.questionSound = this.sound.add(FreeSizeCard.KEY + '-' + type + '-sound')
        this.createSpeaker()
        for (let i = 0; i < 2; i++) {
          var data = this.configTheQuestionCard(i, 2)
          card = new FreeSizeCard(this, key, data, false)
          this.things.questionCards.push(card)
        }
    }

    this.addAnswers(answersData)
  }

  addAnswers (answersData) {
    this.things.answerCards = []
    this.things.whileCards = []
    var questionCards = this.things.questionCards
    var questionCard = questionCards[questionCards.length - 1]

    var questionKey = this.things.questionKey
    var total = Object.keys(answersData).length
    var number = 0;

    for (let key in answersData) {
      let data = this.configTheAnswerCard(number, total)
      let answerKey = questionKey + '_' + key
      let extend = this.things.level === 'hardest' ? '_so_trang' : ''
      let card = new FreeSizeCard(this, answerKey + extend, data, false)
      this.input.setDraggable(card)
      this.things.answerCards.push(card)

      if (this.things.level !== 'hardest' || answerKey === questionCard.key) {
        let whileData = this.configTheWhileCard(card, answersData[key].x, answersData[key].y)
        let whileCard = new FreeSizeCard(this, 'mau_trang', whileData, false, true)
        whileCard.answerKey = card.key
        this.things.whileCards.push(whileCard)
      }

      number++
    }
  }

  configTheQuestionCard (number, total) {
    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width / 3 * 2
    let width = (endX - startX - padding * (total - 1)) / total
    const height = this.cameras.main.height - 200

    let x = startX + width * (number + 0.5) + padding * number
    const y = this.cameras.main.centerY

    if (total == 2) {
      if (number == 0) {
        width = (endX - startX - padding * (total - 1)) * 40 / 100
        x = startX + width * (number + 0.5)
      } else {
        width = (endX - startX - padding * (total - 1)) * 60 / 100
        x = endX - width * 0.5
      }
    }

    return {
      x: x,
      y: y,
      width: width,
      height: height
    }
  }

  configTheAnswerCard (number, total) {
    const paddingX = parseInt(this.cameras.main.width * 0.01)
    const paddingY = parseInt(this.cameras.main.height * 0.01)
    const startX = (this.cameras.main.width - 100) / 3 * 2 + 100
    const startY = 110
    const endX = this.cameras.main.width - 50
    const endY = this.cameras.main.height - 110

    const width = (endX - startX) - paddingX * 2
    const height = (endY - startY) / total - paddingY * 2

    const x = startX + (endX - startX) / 2
    const y = startY + height * (number + 0.5) + paddingY * (2 * number - 1)

    return {
      x: x,
      y: y,
      width: width,
      height: height
    }
  }

  configTheWhileCard (answerCard, x, y) {
    var questionCards = this.things.questionCards
    var questionCard = questionCards[questionCards.length - 1]

    let topLeftQuestionX = questionCard.x - questionCard.displayWidth / 2
    let topLeftQuestionY = questionCard.y - questionCard.displayHeight / 2


    let scale = questionCard.scaleX

    let topLeftWhileX = topLeftQuestionX + x * scale
    let topLeftWhileY = topLeftQuestionY + y * scale

    let width = scale * answerCard.width
    let height = scale * answerCard.height

    let whileX = topLeftWhileX + width / 2
    let whileY = topLeftWhileY + height / 2

    return {
      x: whileX,
      y: whileY,
      width: width,
      height: height
    }
  }

  createTheDragFeature () {
    this.input.dragDistanceThreshold = 16
    this.input.on('dragstart', (pointer, gameObject) => {
      this.children.bringToTop(gameObject)
      this.things.originalX = gameObject.x
      this.things.originalY = gameObject.y
    })

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.input.on('dragend', (pointer, gameObject) => {
      var whileCards = this.things.whileCards
      var win = false
      for (let index in whileCards) {
        var card = whileCards[index]
        let minX = card.x - card.displayWidth / 2
        let maxX = card.x + card.displayWidth / 2
        let minY = card.y - card.displayHeight / 2
        let maxY = card.y + card.displayHeight / 2

        if (pointer.x > minX && pointer.x < maxX && pointer.y > minY && pointer.y < maxY && card.answerKey == gameObject.key) {
          win = true
          whileCards.splice(index, 1)
          this.things.whileCards = whileCards
          break
        }
      }

      if (win) {
        this.playRightSound(1.5);

        this.tweens.add({
          targets: gameObject,
          scaleX: gameObject.scaleX * 1.5,
          scaleY: gameObject.scaleY * 1.5,
          duration: 500,
        })
        this.time.delayedCall(500, () => {
          this.tweens.add({
            targets: gameObject,
            scaleX: 0,
            scaleY: 0,
            duration: 500,
          })
        })
        this.time.delayedCall(1000, () => {
          destroyObject(gameObject)
          destroyObject(card)
        })
        this.time.delayedCall(1500, () => {
          if (this.things.whileCards.length === 0) this.won()
        })
      } else {
        this.time.delayedCall(1500, () => {
          this.playWrongSound()
          gameObject.x = this.things.originalX
          gameObject.y = this.things.originalY
        })
      }
    })
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, MainGameScene.KEY)
  }

  createSpeaker () {
    let x = this.cameras.main.width - 70
    let y = this.cameras.main.height - 70
    this.things.speaker = new Cards(this, 'speakerI', 0, { x: x, y: y, scale: 0.5, hasSound: false, allowClick: true }, null, true, {}, () => this.things.questionSound.play())
  }

  onCardChoose (card) {
    Phaser.Actions.Call(this.things.answers, (item) => {
      item.allowClick = false
    })

    this.stopWrongSound()

    let delay = card.sound.duration * 1000

    if (card.cardKey !== this.things.questionCard.cardKey) {
      this.playWrongSound(delay / 1000)
      delay += this.things.wrongSound.duration * 1000

      this.time.delayedCall(delay, () => {
        destroyObject(card)
      })
    } else {
      Phaser.Actions.Call(this.things.answers, (item) => {
        if (item.cardKey !== card.cardKey) destroyObject(item)
      })

      this.tweens.add({
        targets: card,
        x: this.cameras.main.centerX,
        scaleX: card.scaleX * 1.5,
        scaleY: card.scaleY * 1.5,
        duration: 200
      })

      this.playRightSound(delay / 1000)
      delay += this.things.rightSound.duration * 1000

      this.time.delayedCall(delay, () => {
        this.won()
      })
    }

    Phaser.Actions.Call(this.things.answers, (item) => {
      if (item.cardKey !== card.cardKey) item.allowClick = true
    })
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
    this.scene.stop()
    this.scene.resume(MainGameScene.KEY, { from: MoveTheTmagesToTheRightPositionsScene.KEY, diamond: MoveTheTmagesToTheRightPositionsScene.WIN_DIAMOND })
  }
}

export default MoveTheTmagesToTheRightPositionsScene
