import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'
import Cards from '../components/Cards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import SortingCharactersGuideSound from '../components/SortingCharactersGuideSound'

class SortingCharactersScene extends Phaser.Scene {
  static get KEY () {
    return 'SortingCharactersScene'
  }

  static get WIN_COIN () {
    return 100
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
    this.cameras.main.setBackgroundColor('#000000')
    if (!data.noGuide) this.playGuideSound()

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate(data.noGuide)
  }

  generate (noGuide) {
    var question = []
    var alphabetListDefault = JSON.parse(JSON.stringify(this.things.alphabetList))
    var alphabetList = this.things.alphabetList
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
        index = Math.floor(Math.random() * 24)
        question.push(alphabetList[index])
        question.push(alphabetList[index + 1])
        question.push(alphabetList[index + 2])
        question.push(alphabetList[index + 3])
        break

      case 'hard':
        index = Math.floor(Math.random() * 23)
        question.push(alphabetList[index])
        question.push(alphabetList[index + 1])
        question.push(alphabetList[index + 2])
        question.push(alphabetList[index + 3])
        question.push(alphabetList[index + 4])
        break

      case 'hardest':
        for (let i = 0; i < 5; i++) {
          let item = randSplice(alphabetList)
          let index = alphabetListDefault.indexOf(item)
          question[index] = item
          question = question.filter((el) => {
            return el !== 'empty'
          })
        }
        break
    }

    this.createQuestion(question)
    this.createAnswers(question)
    this.createSpeaker(question)

    let delay = noGuide ? 1500 : (2 + this.things.guideSound.duration) * 1000
    this.time.delayedCall(delay, () => {
      if (!this.things.beStopped) this.onClickSpeaker()
    })
  }

  createSpeaker (question) {
    let data = this.calculateQuestionCard(0, question.length)
    data.hasSound = false
    // eslint-disable-next-line no-unused-vars
    const card = new Cards(this, 'speakerI', 0, data, false, true, {}, this.onClickSpeaker.bind(this))
  }

  createQuestion (question) {
    this.things.questionCardsSounds.totalDuration = 0
    this.things.questionCardsSounds.list = []
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
      card.sound.on('play', () => {
        card.setFrame(1)
      })
      card.sound.on('ended', () => {
        card.setFrame(card.currentFrame)
      })

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
      this.things.answerCards.push(card)
      card.listIndex = this.things.answerCards.length - 1
    }
  }

  calculateQuestionCard (number, total) {
    const { assetWidth, assetHeight } = Cards.ASSETSPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 100
    const endX = this.cameras.main.width - startX
    const row = 3
    const column = total + 1
    const width = (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + padding / 2 + number * width + width / 2)
    const y = parseInt(this.cameras.main.height / row)

    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  calculateAnswerCard (number, total) {
    const { assetWidth, assetHeight } = Cards.ASSETSPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - startX
    const row = 3
    const column = total
    const width = (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + padding / 2 + number * width + width / 2)
    const y = this.cameras.main.height - padding * 2

    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, GameOneScene.KEY, () => {
      this.stopGuideSound()
    })
  }

  onClickSpeaker (pointer, x, y, event) {
    this.stopGuideSound()
    if (event) event.stopPropagation()
    if (this.allowClick === false) return
    Phaser.Actions.Call(this.things.questionCardsSounds.list, (item) => {
      const { sound, delay } = item
      this.time.delayedCall(delay, () => {
        sound.play()
      })
    })
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    if (this.allowClick === false) return
    this.sound.play()
    this.cb(this)
  }

  checkAnswer (card) {
    this.stopGuideSound()
    this.things.rightSound.stop()
    this.things.wrongSound.stop()

    var questionCards = this.things.questionCards
    var answerCards = this.things.answerCards
    let currentQuestionCard = questionCards[this.things.currentQuestionCardIndex]
    if (card.cardKey === currentQuestionCard.cardKey) {
      currentQuestionCard.flipOut(false)
      this.things.currentQuestionCardIndex++
      this.playRightSound()
      destroyObject(this.things.answerCards[card.listIndex])
    } else {
      this.playWrongSound()
    }
    if (this.things.currentQuestionCardIndex > questionCards.length - 1) {
      for (let index in answerCards) {
        answerCards[index].allowClick = false
      }
      this.time.delayedCall(2000, () => {
        this.won()
      })
    }
  }

  playGuideSound () {
    this.things.guideSound = this.sound.add(SortingCharactersGuideSound.KEY)
    this.things.guideSound.play({ delay: 1.5 })
  }

  stopGuideSound () {
    if (this.things.guideSound) this.things.guideSound.stop()
    this.things.beStopped = true
  }

  playRightSound () {
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay: 1.2 })
  }

  playWrongSound () {
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay: 1.2 })
  }

  stopWrongSound () {
    if (this.things.wrongSound) this.things.wrongSound.stop()
  }

  won () {
    this.stopGuideSound()
    this.scene.stop()
    this.scene.resume(GameOneScene.KEY, { from: SortingCharactersScene.KEY, coin: SortingCharactersScene.WIN_COIN })
  }
}

export default SortingCharactersScene
