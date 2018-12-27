import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'
import { destroyObject, randItem, randSplice, shuffle, removeTimbre } from '../helpers'
import Cards from '../components/Cards'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import FindCharactersGuideSound from '../components/FindCharactersGuideSound'
import store from 'store'

class FindCharactersScene extends Phaser.Scene {
  static get KEY () {
    return 'FindCharactersScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: FindCharactersScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      alphabetList: ['a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y'],
      wordList: ['Hoa_phượng', 'Hoa_bằng_lăng', 'Hoa_bướm', 'Hoa_cẩm_tú_cầu', 'Hoa_cúc', 'Hoa_thuỷ_tiên', 'Hoa_râm_bụt', 'Hoa_cẩm_chướng', 'Hoa_bồ_công_anh'],
      individualNouns: ['Vịnh_Hạ_Long', 'Lăng_Bác', 'Nhà_thờ_Đức_Bà', 'Cầu_Rồng_Đà_Nẵng', 'Chùa_Một_Cột', 'Hoàng_thành_Huế'],
      questionCharacterCards: [],
      answerCards: [],
      currentQuestionCardIndex: 0,
      rightSound: this.sound.add(RightSound.KEY),
      wrongSound: this.sound.add(WrongSound.KEY),
      noGuide: data.noGuide,
      beStopped: false
    }
    this.cameras.main.setBackgroundColor('#AED581')

    const noGuide = store.get(FindCharactersScene.KEY)
    if (!noGuide) {
      store.set(FindCharactersScene.KEY, 1)
      this.playGuideSound()
    }
    this.things.noGuide = noGuide

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  generate () {
    let question = randItem(this.things.wordList)
    this.things.question = question

    let questionCharacters = question.split('')

    let hideList = []
    const level = this.things.level
    let length
    let more
    let arrayIndex

    switch (level) {
      case 'easy':
        length = questionCharacters.length
        more = length < 4 ? length - 1 : 3
        arrayIndex = Array.apply(null, { length }).map(Number.call, Number)
        for (let i = 0; i < more; i++) {
          hideList.push(randSplice(arrayIndex))
        }
        break

      case 'normal':
        question = randItem(this.things.individualNouns)
        this.things.question = question
        questionCharacters = question.split('')
        length = questionCharacters.length
        more = length < 4 ? length - 1 : 3
        arrayIndex = Array.apply(null, { length }).map(Number.call, Number)
        for (let i = 0; i < more; i++) {
          hideList.push(randSplice(arrayIndex))
        }
        break

      case 'hard':
        let showList = [0]
        let count = 0
        for (let index in question) {
          if (question[index] === '_') {
            showList.push(parseInt(index) - count)
            count++
          }
        }
        length = questionCharacters.length
        arrayIndex = Array.apply(null, { length }).map(Number.call, Number)
        hideList = arrayIndex.filter((el) => !showList.includes(el))
        break

      case 'hardest':
        length = questionCharacters.length
        hideList = Array.apply(null, { length }).map(Number.call, Number)
        break
    }

    this.things.hideList = hideList
    this.createQuestion(questionCharacters, hideList)
    this.createAnswers(questionCharacters)
  }

  createQuestion (questionCharacters, hideList) {
    let question = this.things.question
    let questionData = this.calculateQuestionCard(questionCharacters.length)

    // create panel
    this.things.pannel = this.add.rectangle(0, questionData.y, this.cameras.main.width, questionData.height * 1.2, 0xF9A825)
    this.things.pannel.setOrigin(0, 0.5)

    // create question image
    let questionCard = new HorizontalCards(this, question + 'I', questionData.x, questionData.y, questionData.scale, 1, true, this.stopGuideSound.bind(this), true, {})
    this.things.questionCard = questionCard
    let delay = this.things.noGuide ? 1500 : (1.5 + this.things.guideSound.duration) * 1000
    this.time.delayedCall(delay, () => questionCard.sound.play())

    // create question characters
    for (let index in questionCharacters) {
      let key = questionCharacters[index]
      if (key === '_') continue

      let number = parseInt(index) + 4.5
      let data = this.calculateQuestionCharacterCard(number, questionCharacters.length)
      data.allowClick = false
      let card = new Cards(this, key, number, data, false, true, {}, false)

      if (hideList.indexOf(parseInt(index)) < 0) card.flipOut(false)
      else {
        card.makeWhite(false)
        this.things.questionCharacterCards.push(card)
      }
    }

    this.animateCurrentCard()
  }

  createAnswers (questionCharacters) {
    let questionWithoutDash = []
    for (let i = questionCharacters.length - 1; i >= 0; i--) if (questionCharacters[i] !== '_') questionWithoutDash.push(questionCharacters[i])
    let answers = questionWithoutDash
    let alphabetList = JSON.parse(JSON.stringify(this.things.alphabetList))

    for (let index in answers) {
      answers[index] = removeTimbre(answers[index])
      let indexOfAnswer = alphabetList.indexOf(answers[index])
      if (indexOfAnswer >= 0) alphabetList.splice(indexOfAnswer, 1)
    }

    for (let i = 0; i < 3; i++) {
      let item = randSplice(alphabetList)
      answers.push(item)
    }

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

  calculateQuestionCard (total) {
    const startColumn = 4
    const row = 2.7
    const startX = 10

    const { assetWidth, assetHeight } = HorizontalCards.ASSETSPEC
    const padding = parseInt(this.cameras.main.width * 0.01)
    const endX = this.cameras.main.width - startX
    const column = total + startColumn
    const width = startColumn * (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + width / 2)
    const y = parseInt(this.cameras.main.height / row)

    return {
      x: x,
      y: y,
      scale: scale,
      height: assetHeight * scale
    }
  }

  calculateQuestionCharacterCard (number, total) {
    const { assetWidth, assetHeight } = Cards.ASSETSPEC

    const startColumn = 4.5
    const startX = 10

    const padding = parseInt(this.cameras.main.width * 0.01)
    const endX = this.cameras.main.width - startX
    const row = 2.7
    const column = total + startColumn
    const width = (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + number * width + width / 2)
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
    const x = parseInt(startX + padding / 2 + number * width + width / 2 - padding / 2)
    const y = this.cameras.main.height - padding * 2

    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    if (this.allowClick === false) return
    this.sound.play()
    this.cb(this)
  }

  checkAnswer (card) {
    this.stopGuideSound()

    this.things.questionCard.sound.stop()
    this.things.rightSound.stop()
    this.things.wrongSound.stop()

    let questionCharacterCards = this.things.questionCharacterCards
    let currentQuestionCard = questionCharacterCards[0]

    let delay = card.sound.duration * 1000

    if (card.cardKey !== removeTimbre(currentQuestionCard.cardKey)) this.playWrongSound(delay / 1000)
    else {
      currentQuestionCard.flipOut(false)
      currentQuestionCard.setScale(currentQuestionCard.oldScaleX, currentQuestionCard.oldScaleY)
      currentQuestionCard.tween.stop()
      destroyObject(currentQuestionCard.tween)
      questionCharacterCards.splice(0, 1)
      destroyObject(this.things.answerCards[card.listIndex])
      this.animateCurrentCard()
    }

    if (questionCharacterCards.length === 0) {
      this.time.delayedCall(delay, () => {
        this.things.questionCard.sound.play()
      })
      delay += this.things.questionCard.sound.duration * 1000

      this.playRightSound(delay / 1000)
      delay += this.things.rightSound.duration * 1000

      this.time.delayedCall(delay, () => {
        this.won()
      })
    }
  }

  animateCurrentCard () {
    if (this.things.questionCharacterCards.length === 0) return

    const currentQuestionCard = this.things.questionCharacterCards[0]
    currentQuestionCard.oldScaleX = currentQuestionCard.scaleX
    currentQuestionCard.oldScaleY = currentQuestionCard.scaleY
    currentQuestionCard.tween = this.tweens.add({
      targets: currentQuestionCard,
      scaleX: currentQuestionCard.scaleX * 1.3,
      scaleY: currentQuestionCard.scaleY * 1.3,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    })
  }

  playGuideSound () {
    this.things.guideSound = this.sound.add(FindCharactersGuideSound.KEY)
    this.things.guideSound.play({ delay: 1.5 })
  }

  stopGuideSound () {
    if (this.things.guideSound) this.things.guideSound.stop()
    this.things.beStopped = true
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

  won () {
    this.stopGuideSound()
    this.scene.stop()
    this.scene.resume(GameOneScene.KEY, { from: FindCharactersScene.KEY, diamond: FindCharactersScene.WIN_DIAMOND })
  }
}

export default FindCharactersScene
