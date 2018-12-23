import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'
import { destroyObject, randItem, randSplice, shuffle, onlyUnique, removeTimbre } from '../helpers'
import Cards from '../components/Cards'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import FindCharactersGuideSound from '../components/FindCharactersGuideSound'

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
      wordlist: ['Hoa_Phượng', 'Hoa_bằng_lăng', 'Hoa_bướm', 'Hoa_cẩm_tú_cầu', 'Hoa_cúc', 'Hoa_thuỷ_tiên', 'Hoa_râm_bụt'],
      individualNouns: ['Vịnh_Hạ_Long', 'Lăng_Bác', 'Nhà_thờ_Đức_Bà', 'Cầu_rồng_Đà_Nẵng', 'Chùa_Một_Cột'],
      questionCharacterCards: [],
      answerCards: [],
      currentQuestionCardIndex: 0,
      rightSound: this.sound.add(RightSound.KEY),
      wrongSound: this.sound.add(WrongSound.KEY),
      noGuide: data.noGuide,
      beStopped: false,
    }
    this.cameras.main.setBackgroundColor('#000000')
    if (!data.noGuide) this.playGuideSound()

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  generate () {
    var question = randItem(this.things.wordlist)
    this.things.question = question
    var questionCharacters = question.split('')
    for (var i = questionCharacters.length - 1; i >= 0; i--) {
      if(questionCharacters[i] === '_') {
         questionCharacters.splice(i, 1);
      }
    }
    var hideList = []
    const level = this.things.level

    switch (level) {
      case 'easy':
        var length = questionCharacters.length
        var more = length < 4 ? length - 1 : 3
        var arrayIndex = Array.apply(null, {length: length}).map(Number.call, Number)
        for (let i=0; i< more; i++) {
          hideList.push(randSplice(arrayIndex))
        }
        break

      case 'normal':
        question = randItem(this.things.individualNouns)
        this.things.question = question
        questionCharacters = question.split('')
        for (var i = questionCharacters.length - 1; i >= 0; i--) {
          if(questionCharacters[i] === '_') {
             questionCharacters.splice(i, 1);
          }
        }
        var length = questionCharacters.length
        var more = length < 4 ? length - 1 : 3
        var arrayIndex = Array.apply(null, {length: length}).map(Number.call, Number)
        for (let i=0; i< more; i++) {
          hideList.push(randSplice(arrayIndex))
        }
        break

      case 'hard':
        var showList = [0]
        var count = 0
        for (let index in question) {
          if (question[index] === '_') {
            showList.push(parseInt(index) - count)
            count++
          }
        }
        var length = questionCharacters.length
        var arrayIndex = Array.apply(null, {length: length}).map(Number.call, Number)
        hideList = arrayIndex.filter((el) => !showList.includes(el))
        break

      case 'hardest':
        var length = questionCharacters.length
        hideList = Array.apply(null, {length: length}).map(Number.call, Number)
        break
    }
    this.things.hideList = hideList
    this.createQuestion(questionCharacters, hideList)
    this.createAnswers(questionCharacters)
  }

  createQuestion (questionCharacters, hideList) {
    // create question image
    let question = this.things.question
    let questionData = this.calculateQuestionCard(questionCharacters.length)
    let questionCard = new HorizontalCards(this, question + 'I', questionData.x, questionData.y, questionData.scale, 1, true, this.stopGuideSound.bind(this), true, {}, true)
    this.things.questionCard = questionCard
    var delay = this.things.noGuide ? 1500 : (1.5 + this.things.guideSound.duration) * 1000
    this.time.delayedCall(delay, () => {
      if (!this.things.beStopped) questionCard.sound.play()
    })

    // create question characters
    for (let index in questionCharacters) {
      let key = questionCharacters[index]
      let number = parseInt(index) + 3
      let data = this.calculateQuestionCharacterCard(number, questionCharacters.length)
      data.allowClick = false
      let card = new Cards(this, key, number, data, false, true, {}, false)
      if (hideList.indexOf(parseInt(index)) < 0) {
        card.flipOut(false)
      } else {
        card.makeWhite(false)
        this.things.questionCharacterCards.push(card)
      }
    }
  }

  createAnswers (questionCharacters) {
    var answers =  questionCharacters.filter(onlyUnique)
    var alphabetList = JSON.parse(JSON.stringify(this.things.alphabetList))

    for (let index in answers) {
      answers[index] = removeTimbre(answers[index])
      let indexOfAnswer = alphabetList.indexOf(answers[index])
      if (indexOfAnswer >= 0) alphabetList.splice(indexOfAnswer, 1)
    }

    for (let i=0; i<3; i++) {
      let item = randSplice(alphabetList)
      answers.push(item)
    }

    answers = shuffle(answers)
    for (let index in answers) {
      let key = answers[index]
      let number = parseInt(index)
      let data = this.calculateAnswerCard(number, answers.length)
      data.isOpen = true
      let card = new Cards(this, key, number, data, this.checkAnswer.bind(this), true, {}, this.onPointerDown)
      this.things.answerCards.push(card)
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
    const { assetWidth, assetHeight } = HorizontalCards.ASSETSPEC
    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - startX
    const row = 3
    const column = total + 3
    const width = 3 * (endX - startX) / column
    const height = this.cameras.main.height / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt(startX + padding / 2 + width / 2)
    const y = parseInt(this.cameras.main.height / row)

    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  calculateQuestionCharacterCard (number, total) {
    const { assetWidth, assetHeight } = Cards.ASSETSPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - startX
    const row = 3
    const column = total + 3
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
    const y = parseInt(this.cameras.main.height / row * 2)

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
    var questionCharacterCards = this.things.questionCharacterCards
    var answerCards = this.things.answerCards
    let currentQuestionCard = questionCharacterCards[0]
    if (card.cardKey === removeTimbre(currentQuestionCard.cardKey)) {
      currentQuestionCard.flipOut(false)
      questionCharacterCards.splice(0,1)
      var delay = 800
      if (questionCharacterCards.length == 0) {
        this.time.delayedCall(delay, () => {
           this.things.questionCard.sound.play()
        })
        delay += this.things.questionCard.sound.duration + 200
      }
      this.time.delayedCall(delay, () => {
         this.playRightSound()
      })
      delay += this.things.rightSound.duration + 2000
      if (questionCharacterCards.length == 0) {
        for (let index in answerCards) {
          answerCards[index].allowClick = false
        }
        this.time.delayedCall(delay, () => {
           this.won()
        })
      }
    } else {
      this.playWrongSound()
    }
  }

  playGuideSound () {
    this.things.guideSound = this.sound.add(FindCharactersGuideSound.KEY)
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
    this.scene.resume(GameOneScene.KEY, { from: FindCharactersScene.KEY, diamond: FindCharactersScene.WIN_DIAMOND })
  }
}

export default FindCharactersScene
