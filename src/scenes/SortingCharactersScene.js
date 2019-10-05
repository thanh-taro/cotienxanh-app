import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import MainGameScene from './MainGameScene'
import Cards from '../components/Cards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import { destroyObject, randItem, randSplice, shuffle, clearCaches } from '../helpers'
import SortingCharactersNormalAndHardestGuideSound from '../components/SortingCharactersNormalAndHardestGuideSound'

class SortingCharactersScene extends Phaser.Scene {
  static get KEY () {
    return 'SortingCharactersScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: SortingCharactersScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      alphabetList: ['a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y'],
      questionCards: [],
      questionCardsSounds: {},
      answerCards: [],
      currentQuestionCardIndex: 0,
      rightSound: this.sound.add(RightSound.KEY),
      wrongSound: this.sound.add(WrongSound.KEY),
      beStopped: false
    }
    this.cameras.main.setBackgroundColor('#4DD0E1')

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  generate () {
    let question = []
    let alphabetList = this.things.alphabetList
    const easyGroup = ['aăâ', 'oôơ', 'lmn', 'cdđ', 'uưv']
    const level = this.things.level
    let index

    switch (level) {
      case 'easy':
        question = randItem(easyGroup).split('')
        Phaser.Actions.Call(question, function (item) {
          let index = alphabetList.indexOf(item)
          alphabetList.splice(index, 1)
        })
        break

      case 'normal':
        index = Math.floor(Math.random() * 26)
        question.push(alphabetList[index])
        question.push(alphabetList[index + 1])
        question.push(alphabetList[index + 2])
        question.push(alphabetList[index + 3])
        break

      case 'hard':
        index = Math.floor(Math.random() * 25)
        question.push(alphabetList[index])
        question.push(alphabetList[index + 1])
        question.push(alphabetList[index + 2])
        question.push(alphabetList[index + 3])
        question.push(alphabetList[index + 4])
        break

      case 'hardest':
        for (let i = 0; i < 5; i++) {
          question.push(randSplice(alphabetList))
        }
        break
    }

    this.createQuestion(question)
    this.createAnswers(question)
    this.createSpeaker(question)

    this.things.allowPlay = true

    Phaser.Actions.Call(this.things.questionCardsSounds.list, (item) => {
      const { sound, delay } = item
      this.time.delayedCall(delay, () => {
        if (this.things.allowPlay) sound.play()
      })
    })

    this.time.delayedCall(this.things.questionCardsSounds.totalDuration, () => this.enableAnswers())
  }

  createSpeaker (question) {
    let data = this.calculateQuestionCard(0, question.length)
    data.scale = 0.8
    data.hasSound = false
    this.things.allowPlay = false
    // eslint-disable-next-line no-unused-vars
    const card = new Cards(this, 'speakerI', 0, data, false, true, {}, this.onClickSpeaker.bind(this))
  }

  createQuestion (question) {
    this.things.questionCardsSounds.totalDuration = 0
    this.things.questionCardsSounds.list = []

    // create panel
    let data = this.calculateQuestionCard(1, question.length)
    this.things.panel = this.add.rectangle(0, data.y, this.cameras.main.width, data.height * 1.2, 0xF9A825)
    this.things.panel.setOrigin(0, 0.5)

    let lastDelay = 0
    for (let index in question) {
      let key = question[index]
      let number = parseInt(index) + 1
      let data = this.calculateQuestionCard(number, question.length)
      data.allowClick = false
      let card = new Cards(this, key, number, data, false, true, {}, this.onPointerDown)
      card.makeWhite(false)
      this.things.questionCards.push(card)

      let duration = (card.sound.duration + 0.2) * 1000
      this.things.questionCardsSounds.totalDuration += duration
      this.things.questionCardsSounds.list.push({ sound: card.sound, delay: lastDelay })
      card.sound.on('play', () => card.setFrame(1))
      card.sound.on('ended', () => card.setFrame(card.currentFrame))

      lastDelay += duration
    }
  }

  createAnswers (question) {
    var answers = question
    answers = shuffle(answers)
    for (let index in answers) {
      let key = answers[index]
      let number = parseInt(index)
      let data = this.calculateAnswerCard(number, answers.length)
      data.isOpen = true
      data.origin = { x: 0.5, y: 1 }
      let card = new Cards(this, key, number, data, this.checkAnswer.bind(this), true, {}, this.onPointerDown)
      card.allowClick = false
      this.things.answerCards.push(card)
      card.listIndex = this.things.answerCards.length - 1
    }
  }

  disableAnswers () {
    Phaser.Actions.Call(this.things.answerCards, function (card) {
      card.allowClick = false
    })
  }

  enableAnswers () {
    Phaser.Actions.Call(this.things.answerCards, function (card) {
      card.allowClick = true
    })
  }

  calculateQuestionCard (number, total) {
    const { assetWidth, assetHeight } = Cards.ASSET_SPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 10
    const endX = this.cameras.main.width - startX
    const row = 2.7
    const column = total + 1
    const width = (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + number * width + width / 2)
    const y = parseInt(this.cameras.main.height / row)

    return { x, y, scale, height }
  }

  calculateAnswerCard (number, total) {
    const { assetWidth, assetHeight } = Cards.ASSET_SPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = this.cameras.main.width * 0.17
    const endX = this.cameras.main.width - startX
    const row = 3
    const column = total
    const width = (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + number * width + width / 2)
    const y = this.cameras.main.height - padding * 2

    return { x, y, scale }
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, MainGameScene.KEY)
  }

  onClickSpeaker (pointer, x, y, event) {
    this.disableAnswers()

    if (event) event.stopPropagation()
    if (this.allowClick === false) return

    Phaser.Actions.Call(this.things.questionCardsSounds.list, (item) => {
      const { sound, delay } = item
      this.time.delayedCall(delay, () => {
        sound.play()
      })
    })

    this.time.delayedCall(this.things.questionCardsSounds.totalDuration, () => {
      this.enableAnswers()
    })
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    if (this.allowClick === false) return
    this.sound.play()
    this.cb(this)
  }

  checkAnswer (card) {
    this.things.rightSound.stop()
    this.things.wrongSound.stop()

    var questionCards = this.things.questionCards
    var answerCards = this.things.answerCards
    let currentQuestionCard = questionCards[this.things.currentQuestionCardIndex]

    let delay = card.sound.duration * 1000

    if (card.cardKey === currentQuestionCard.cardKey) {
      currentQuestionCard.flipOut(false)
      this.things.currentQuestionCardIndex++
      destroyObject(this.things.answerCards[card.listIndex])
    } else {
      this.playWrongSound(delay / 1000)
    }
    if (this.things.currentQuestionCardIndex > questionCards.length - 1) {
      for (let index in answerCards) answerCards[index].allowClick = false

      this.playRightSound(delay / 1000)
      delay += this.things.rightSound.duration * 1000
      this.time.delayedCall(delay, () => this.won())
    }
  }

  playRightSound (delay = 0) {
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay })
  }

  playWrongSound (delay = 0) {
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay })
  }

  stopWrongSound () {
    if (this.things.wrongSound) this.things.wrongSound.stop()
  }

  // playGuideSound () {
  //   if (this.things.guideSound === undefined) this.things.guideSound = this.sound.add(SortingCharactersNormalAndHardestGuideSound.KEY)
  //   this.things.guideSound.play()
  // }

  won () {
    clearCaches(this)
    this.scene.stop()
    this.scene.resume(MainGameScene.KEY, { from: SortingCharactersScene.KEY, diamond: SortingCharactersScene.WIN_DIAMOND })
  }
}

export default SortingCharactersScene
