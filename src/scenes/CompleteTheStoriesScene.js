import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import Cards from '../components/Cards'
import MainGameScene from './MainGameScene'
import { destroyObject, randItem, randSplice, shuffle, clearCaches } from '../helpers'
import AskSound from '../components/AskSound'
import Text from '../components/Text'
import poemContent from '../app/asset/content/poemContent'

class CompleteTheStoriesScene extends Phaser.Scene {
  static get KEY () {
    return 'CompleteTheStoriesScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: CompleteTheStoriesScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      poem: {
        'easy': ['khong_vut_rac', 'choi_ngoan', 'ong_va_buom', 'gio_an', 'dan_ga_con'],
        // 'normal': ['poem_3', 'poem_4'],
      },
      answers: ['Bánh_có_lá', 'Chổi', 'Con_Bướm', 'Con_ong', 'Quả_chuối', 'Thùng_rác']
    }
    this.cameras.main.setBackgroundColor('#AED581')
    this.things.level = data.level
    this.createMusicButton()
    this.createBackButton()
    this.createQuestionCards()
    this.createTheAnswerCards()

    this.showNextQuestion(true)
  }

  createQuestionCards () {
    const level = this.things.level
    const question = this.things.question = randItem(this.things.poem[level])
    this.things.sound = this.sound.add(HorizontalCards.KEY + '-' + question + '-sound')
    const x = this.cameras.main.width * 5 / 100
    const y = this.cameras.main.centerY
    this.things.text = new Text(this, x, y , '', {fontSize: '30px'})
    this.things.dataPoem = JSON.parse(JSON.stringify(poemContent[question]))
  }

  createTheAnswerCards () {
    const dataPoem = this.things.dataPoem
    var answers = []
    for (var index in dataPoem) {
      if (dataPoem[index].answer !== undefined) {
        answers.push(dataPoem[index].answer)
      }
    }
    if (answers.length < 3) {
      var data = JSON.parse(JSON.stringify(this.things.answers))
      for (let index in answers) {
        let position = data.indexOf(answers[index].image)
        if (position > -1) {
          data.splice(position, 1)
        }
      }
      var length = answers.length
      for (let i = 0; i < 3 - length; i++) {
        answers.push({
          image: randSplice(data),
          words: ''
        })
      }
    }
    answers = shuffle(answers);
    this.things.answerCards = []
    for (var index in answers) {
      let number = parseInt(index) + 1
      let key = answers[index].image + 'I'
      let configs = this.configTheAnswerCard(answers.length, number)
      let allowClick = true
      this.things.answerCards.push(new HorizontalCards(this, key, configs.x, configs.y, configs.scale, 1, allowClick, this.onCardChoose.bind(this), true, {}, true))
    }
  }

  showNextQuestion(isFirst = false) {
    // Do not allow click when the poem is being read
    var answerCards = this.things.answerCards
    for (let index in answerCards) {
      answerCards[index].allowClick = false
    }
    var currentData = this.things.currentData = this.things.dataPoem[0]
    if (currentData == undefined) {
      this.won()
    } else {
      if (isFirst) {
        this.things.sound.play()
      } else {
        this.things.sound.resume()
      }
      this.time.delayedCall(currentData.time * 1000, () => {
        if (currentData.answer == undefined) {
          this.playRightSound()
          this.time.delayedCall(1000, () => {
            this.won()
          })
        }
        this.things.sound.pause()
        // Allow to click when the poem is finished reading
        for (let index in answerCards) {
          answerCards[index].allowClick = true
        }
      })
      this.things.wordIndex = 0
      this.time.addEvent({
        delay: currentData.time / currentData.string.length * 1000,
        callback: this.nextWord,
        callbackScope: this,
        repeat: currentData.string.length - 1
      });
    }
  }

  configTheAnswerCard (column, number) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSET_SPEC

    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 10
    const endX = this.cameras.main.width - 10
    const width = (endX - startX) / column
    const height = this.cameras.main.height / 5
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight

    var scale = Math.min(scaleX, scaleY) * 1.3

    var y = this.cameras.main.height / 4 * 3
    var x = startX + (number - 1) * width + width / 2

    return { x, y, scale }
  }

  onCardChoose (card) {
    var currentData = this.things.currentData
    if (card.cardKey == currentData.answer.image) {
      this.playRightSound(1.5)
      this.tweens.add({
        targets: card,
        scaleX: card.scaleX * 1.5,
        scaleY: card.scaleY * 1.5,
        duration: 500,
      })
      this.time.delayedCall(500, () => {
        this.tweens.add({
          targets: card,
          scaleX: 0,
          scaleY: 0,
          duration: 500,
        })
      })
      let length = this.things.text.text.length
      this.things.text.text = this.things.text.text.replace('...', currentData.answer.words)
      this.things.text.setColor('#ffff00', length)
      this.things.text.setColor('#ffff00', length + currentData.answer.words.length)
      this.things.dataPoem.splice(0, 1)
      this.things.currentData = this.things.dataPoem[0]
      this.time.delayedCall(3000, () => {
        this.showNextQuestion()
      })
    } else {
      this.playWrongSound(1.5)
    }
  }

  nextWord() {
    // remove text if the text is too long
    if (this.things.text.text.split('\n').length > 4) this.things.text.text = ''
    const y = this.cameras.main.height * 12 / 100
    this.things.text.text = this.things.text.text.concat(this.things.currentData.string[this.things.wordIndex])
    this.things.text.y = y + this.things.text.height / 2
    this.things.wordIndex++
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, MainGameScene.KEY, this.stopSound.bind(this))
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
    this.time.delayedCall(2, () => {
      clearCaches(this)
      this.scene.stop()
      this.scene.resume(MainGameScene.KEY, { from: CompleteTheStoriesScene.KEY, diamond: CompleteTheStoriesScene.WIN_DIAMOND })
    })
  }

  stopSound () {
    if (this.things.sound) this.things.sound.stop()
  }
}

export default CompleteTheStoriesScene
