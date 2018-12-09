import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import FantasticRotationGuideSound from '../components/FantasticRotationGuideSound'

class FantasticRotationScene extends Phaser.Scene {
  static get KEY () {
    return 'FantasticRotationScene'
  }

  static get WIN_COIN () {
    return 100
  }

  constructor () {
    super({ key: FantasticRotationScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      speed: 10,
      acceleration: 0.05,
      hasAnswers: false,
      wordlist: ['con_meo', 'cho', 'heo', 'bo', 'meo1', 'cho1','heo1', 'bo1'],
      head: ['W', 'I']
    }
    this.cameras.main.setBackgroundColor('#000000')

    if (!data.noGuide) this.playGuideSound()
    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  update () {
    if (this.things.rotation) {
      if (this.things.speed > 0) {
        var speed = this.things.speed
        Phaser.Actions.Call(this.things.rotation.getChildren(), function(card) {
          card.x -= speed
        })
        this.things.speed = this.things.speed - this.things.acceleration
        let firstcard = this.things.rotation.getChildren()[0]
        var width = firstcard.width * firstcard.scaleX
        var max_width = width * (this.things.rotation.children.entries.length - 1)
        var cameraCenterX = this.cameras.main.centerX
        var questionCard
        Phaser.Actions.Call(this.things.rotation.getChildren(), function(card) {
          let x_max = card.x + width / 2
          let x_min = card.x - width / 2
          if (x_max < 0) {
            card.x = card.x + max_width
          }
          if (cameraCenterX > x_min && cameraCenterX < x_max) {
            questionCard = card
            card.alpha = 1
          } else {
            card.alpha = 0.15
          }
        })
        this.things.questionCard = questionCard
      } else {
        if (!this.things.hasAnswers) {
          this.things.questionCard.sound.play()
          this.addAnswers(this.things.questionCard)
          this.things.hasAnswers = true
        }
      }
    }
  }

  generate () {
    this.things.rotation = {}
    this.things.rotation = this.add.group()
    let questions = []
    var wordlist = this.things.wordlist
    var head = this.things.head
    for (let index in wordlist) {
      for (let head_index in head) {
        questions.push(wordlist[index] + head[head_index])
      }
    }
    questions = shuffle(questions)

    for (let index in questions) {
      let key = questions[index]
      let number = parseInt(index) + 1
      let configs = this.configTheQuestionCard(number)
      let card = new HorizontalCards(this, key, configs.x, configs.y, configs.scale, 0.2, false, this.onCardChoose.bind(this), false)
      this.things.rotation.add(card)
    }
  }

  addAnswers (card) {
    let answers = []
    let questionWord = card.cardKey
    let questionHead = card.head
    let wordlist = this.things.wordlist
    let head = this.things.head
    let questionWordIndex = this.things.wordlist.indexOf(questionWord);
    if (questionWordIndex > -1) this.things.wordlist.splice(questionWordIndex, 1)
    let questionHeadIndex = this.things.head.indexOf(questionHead);
    if (questionHeadIndex > -1) this.things.head.splice(questionHeadIndex, 1)

    let answerHead = randItem(head)
    const level = this.things.level

    switch (level) {
      case 'easy':
        answers.push(questionWord + questionHead)
        for (let i=0; i< 1; i++) {
          let item = randSplice(wordlist)
          answers.push(item + questionHead)
        }
        break

      case 'normal':
        answers.push(questionWord + answerHead)
        for (let i=0; i< 1; i++) {
          let item = randSplice(wordlist)
          answers.push(item + randItem(this.things.head))
        }
        break

      case 'hard':
        answers.push(questionWord + answerHead)
        for (let i=0; i< 2; i++) {
          let item = randSplice(wordlist)
          answers.push(item + randItem(this.things.head))
        }
        break

      case 'hardest':
        answers.push(questionWord + answerHead)
        for (let i=0; i< 3; i++) {
          let item = randSplice(wordlist)
          answers.push(item + randItem(this.things.head))
        }
        break
    }

    answers = shuffle(answers)

    this.things.answers = []

    for (let index in answers) {
      let key = answers[index]
      let number = parseInt(index) + 1
      let configs = this.configTheAnswerCard(answers.length, number)
      let allowClick = true
      this.things.answers.push(new HorizontalCards(this, key, configs.x, configs.y, configs.scale, 1, allowClick, this.onCardChoose.bind(this)))
    }
  }

  configTheQuestionCard (number) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSETSPEC

    const column = 3
    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - 50
    const width = this.cameras.main.width / column
    const height = this.cameras.main.height / 5
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight

    const scale = Math.min(scaleX, scaleY)

    const y = this.cameras.main.height / 3
    const x = assetWidth * scale * (number - 1) + assetWidth * scale / 2

    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  configTheAnswerCard (column, number) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSETSPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - 50
    const width = (endX - startX) / column
    const height = this.cameras.main.height / 5
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight

    var scale = Math.min(scaleX, scaleY)

    var y = this.cameras.main.height / 3 * 2
    var x = startX + (number - 1) * width + width / 2

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

  onCardChoose (card) {
    this.stopGuideSound()
    this.stopWrongSound()
    card.allowClick = false
    this.time.delayedCall(1000, () => {
      card.allowClick = true
    })
    if (card.cardKey !== this.things.questionCard.cardKey) {
      this.playWrongSound()
    } else {
      this.playRightSound()

      for (let index in this.things.answers) {
        this.things.answers[index].allowClick = false
      }
      this.time.delayedCall(2000, () => {
        this.won()
      })
    }
  }

  playGuideSound () {
    this.things.guideSound = this.sound.add(FantasticRotationGuideSound.KEY)
    this.things.guideSound.play({ delay: 1.5 })
  }

  stopGuideSound () {
    if (this.things.guideSound) this.things.guideSound.stop()
  }

  playRightSound () {
    if (this.things.rightSound === undefined) this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay: 1.2 })
  }

  playWrongSound () {
    if (this.things.wrongSound === undefined) this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay: 1.2 })
  }

  stopWrongSound () {
    if (this.things.wrongSound) this.things.wrongSound.stop()
  }

  won () {
    this.stopGuideSound()
    this.scene.stop()
    this.scene.resume(GameOneScene.KEY, { from: FantasticRotationScene.KEY, coin: FantasticRotationScene.WIN_COIN })

  }
}

export default FantasticRotationScene
