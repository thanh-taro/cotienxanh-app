import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import Arrow from '../components/Arrow'
import MainGameScene from './MainGameScene'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'

class FantasticRotationScene extends Phaser.Scene {
  static get KEY () {
    return 'FantasticRotationScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: FantasticRotationScene.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      play: false,
      delay: 1000,
      speed: 22,
      acceleration: 0.05,
      hasAnswers: false,
      wordList: [
        'Hoa_phượng', 'Hoa_tulip', 'Hoa_bằng_lăng', 'Hoa_bướm', 'Hoa_cẩm_tú_cầu', 'Hoa_cúc', 'Hoa_thuỷ_tiên', 'Hoa_râm_bụt', 'Hoa_bồ_công_anh', 'Hoa_cẩm_chướng',
        'Vịnh_Hạ_Long', 'Lăng_Bác', 'Hoàng_thành_Huế', 'Nhà_thờ_Đức_Bà', 'Cầu_rồng_Đà_Nẵng', 'Chùa_Một_Cột',
        'Trái_Đất', 'Sao_Thủy', 'Sao_Thổ', 'Sao_Kim', 'Sao_Hỏa', 'Sao_Mộc', 'Sao_Thiên_Vương', 'Mặt_Trăng', 'Mặt_Trời', 'Sao_Chổi', 'Sao_Hải_Vương',
        'Màu_nâu', 'Màu_tím', 'Màu_hồng', 'Màu_trắng', 'Màu_đen', 'Màu_đỏ', 'Màu_cam', 'Màu_vàng', 'Màu_xanh_lá', 'Màu_xám',
        'Hình_ngũ_giác', 'Hình_thoi', 'Hình_trái_tim', 'Hình_ngôi_sao', 'Hình_chữ_nhật', 'Hình_vuông', 'Hình_tròn', 'Hình_bầu_dục', 'Hình_tam_giác'
      ],
      head: ['W', 'I']
    }
    this.cameras.main.setBackgroundColor('#3E2723')

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
    this.createArrow()
  }

  update () {
    if (this.things.delay) {
      this.time.delayedCall(this.things.delay, () => {
        this.things.play = true
      })
      this.things.delay = false
    }
    if (this.things.rotation) {
      if (this.things.speed > 0) {
        if (this.things.play) {
          var speed = this.things.speed
          Phaser.Actions.Call(this.things.rotation.getChildren(), function (card) {
            card.x -= speed
          })
          this.things.speed = this.things.speed - this.things.acceleration
          let firstCard = this.things.rotation.getChildren()[0]
          var width = firstCard.width * firstCard.scaleX
          var maxWidth = width * (this.things.rotation.children.entries.length)
          var cameraCenterX = this.cameras.main.centerX
          var questionCard
          Phaser.Actions.Call(this.things.rotation.getChildren(), function (card) {
            let xMax = card.x + width / 2
            let xMin = card.x - width / 2
            if (xMax < 0) {
              card.x = card.x + maxWidth
            }
            if (cameraCenterX > xMin && cameraCenterX < xMax) {
              questionCard = card
              card.alpha = 1
            } else {
              card.alpha = 0.15
            }
          })
          this.things.questionCard = questionCard
        }
      } else {
        if (!this.things.hasAnswers) {
          const dx = this.cameras.main.centerX - this.things.questionCard.x
          Phaser.Actions.Call(this.things.rotation.getChildren(), (card) => {
            this.tweens.add({
              targets: card,
              x: card.x + dx,
              duration: 200
            })
          })

          this.things.questionCard.sound.play()
          this.time.delayedCall(this.things.questionCard.sound.duration * 1000, () => {
            this.addAnswers(this.things.questionCard)
          })
          this.things.hasAnswers = true
        }
      }
    }
  }

  generate () {
    this.things.rotation = {}
    this.things.rotation = this.add.group()
    let questions = []
    var wordList = this.things.wordList
    var head = this.things.head
    for (let index in wordList) {
      for (let headIndex in head) {
        questions.push(wordList[index] + head[headIndex])
      }
    }
    questions = shuffle(questions)

    for (let index in questions) {
      let key = questions[index]
      let number = parseInt(index) + 1
      let configs = this.configTheQuestionCard(number)
      let card = new HorizontalCards(this, key, configs.x, configs.y, configs.scale, 0.2, false, null, true)
      this.things.rotation.add(card)
    }
  }

  addAnswers (card) {
    let answers = []
    let questionWord = card.cardKey
    let questionHead = card.head
    let wordList = this.things.wordList
    let head = this.things.head
    let questionWordIndex = this.things.wordList.indexOf(questionWord)
    if (questionWordIndex > -1) this.things.wordList.splice(questionWordIndex, 1)
    let questionHeadIndex = this.things.head.indexOf(questionHead)
    if (questionHeadIndex > -1) this.things.head.splice(questionHeadIndex, 1)

    let answerHead = randItem(head)
    const level = this.things.level

    switch (level) {
      case 'easy':
        answers.push(questionWord + questionHead)
        for (let i = 0; i < 1; i++) {
          let item = randSplice(wordList)
          answers.push(item + questionHead)
        }
        break

      case 'normal':
        answers.push(questionWord + answerHead)
        for (let i = 0; i < 1; i++) {
          let item = randSplice(wordList)
          answers.push(item + randItem(this.things.head))
        }
        break

      case 'hard':
        answers.push(questionWord + answerHead)
        for (let i = 0; i < 2; i++) {
          let item = randSplice(wordList)
          answers.push(item + randItem(this.things.head))
        }
        break

      case 'hardest':
        answers.push(questionWord + answerHead)
        for (let i = 0; i < 3; i++) {
          let item = randSplice(wordList)
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
    const { assetWidth, assetHeight } = HorizontalCards.ASSET_SPEC

    const column = 3
    const padding = parseInt(this.cameras.main.width * 0.01)
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

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, MainGameScene.KEY)
  }

  createArrow () {
    destroyObject(this.things.arrow)

    let card = this.things.rotation.children.entries[0]
    const x = this.cameras.main.centerX
    const y = this.cameras.main.height / 3 - card.height * card.scaleY / 2
    this.things.arrow = new Arrow(this, x, y)
    this.things.arrow.setOrigin(0.5, 1)
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
    this.scene.resume(MainGameScene.KEY, { from: FantasticRotationScene.KEY, diamond: FantasticRotationScene.WIN_DIAMOND })
  }
}

export default FantasticRotationScene
