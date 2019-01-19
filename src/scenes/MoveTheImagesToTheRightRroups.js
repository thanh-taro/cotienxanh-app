import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import Arrow from '../components/Arrow'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import MainGameScene from './MainGameScene'
import WrongSound from '../components/WrongSound'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'

class MoveTheImagesToTheRightRroups extends Phaser.Scene {
  static get KEY () {
    return 'MoveTheImagesToTheRightRroups'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: MoveTheImagesToTheRightRroups.KEY })
    this.things = {}
  }

  create (data) {
    this.things = {
      play: false,
      delay: 1000,
      speed: 22,
      acceleration: 0.05,
      hasAnswers: false,
      wordList: {
        'hoa': ['Hoa_phượng', 'Hoa_tulip', 'Hoa_bằng_lăng', 'Hoa_bướm', 'Hoa_cẩm_tú_cầu', 'Hoa_cúc', 'Hoa_thuỷ_tiên', 'Hoa_râm_bụt', 'Hoa_bồ_công_anh', 'Hoa_cẩm_chướng', 'Hoa_đào', 'Hoa_đồng_tiền', 'Hoa_hải_đường', 'Hoa_hồng', 'Hoa_hướng_dương', 'Hoa_lan_hồ_điệp', 'Hoa_lay_ơn', 'Hoa_Thược_Dược', 'Hoa_ly', 'Hoa_mai', 'Hoa_quỳnh', 'Hoa_nhài', 'Hoa_mẫu_đơn', 'Hoa_sen', 'Hoa_sứ', 'Hoa_súng', 'Hoa_thiên_điểu'],
        'dong_vat_hoang_da': ['Tê_giác_một_sừng', 'Sao_la', 'Sóc_đỏ', 'Ngựa_vằn', 'Báo_hoa_mai', 'Khỉ', 'Gấu_trúc', 'Hươu_cao_cổ', 'Chuột_túi', 'Lạc_đà', 'Voi', 'Nai', 'Sư_tử', 'Hổ', 'Cáo', 'Cầy_hương', 'Chồn', 'Đà_điểu'],
        'sinh_vat_bien': ['Bạch_tuộc', 'Cá_mập', 'Cá_heo', 'Cá_ngựa', 'Cá_thu', 'Cá_voi', 'Hải_cẩu', 'Mực', 'Sao_biển', 'Sư_tử_biển', 'Sứa', 'Tôm_hùm', 'Chim_cánh_cụt', 'Tu_hài'],
        'bo_sat': ['Tắc_kè', 'Cá_sấu', 'Rùa', 'Khủng_long', 'Trăn', 'Thằn_lằn', 'Rắn_hổ_mang', 'Kỳ_nhông'],
        'con_trung': ['Kiến_vàng', 'Ong_mật', 'Bọ_đuôi_kim_đen', 'Châu_chấu', 'Chuồn_chuồn_kim', 'Bọ_hung_ba_sừng', 'Bọ_rùa_bảy_chấm', 'Ve_sầu', 'Bướm_khế', 'Bọ_ngựa'],
        'cong_trinh': ['Vịnh_Hạ_Long', 'Lăng_Bác', 'Hoàng_thành_Huế', 'Nhà_thờ_Đức_Bà', 'Cầu_rồng_Đà_Nẵng', 'Chùa_Một_Cột'],
        'hanh_tinh': ['Trái_Đất', 'Sao_Thủy', 'Sao_Thổ', 'Sao_Kim', 'Sao_Hỏa', 'Sao_Mộc', 'Sao_Thiên_Vương', 'Mặt_Trăng', 'Mặt_Trời', 'Sao_Chổi', 'Sao_Hải_Vương'],
        'mau_sac': ['Màu_nâu', 'Màu_tím', 'Màu_hồng', 'Màu_trắng', 'Màu_đen', 'Màu_đỏ', 'Màu_cam', 'Màu_vàng', 'Màu_xanh_lá', 'Màu_xám'],
        'hinh_dang': ['Hình_ngũ_giác', 'Hình_thoi', 'Hình_trái_tim', 'Hình_ngôi_sao', 'Hình_chữ_nhật', 'Hình_vuông', 'Hình_tròn', 'Hình_bầu_dục', 'Hình_tam_giác'],
      },
      head: ['W', 'I'],
      'questionCards': []
    }
    this.cameras.main.setBackgroundColor('#3E2723')

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
    this.createTheDragFeature()
  }

  generate () {
    this.things.rotation = {}
    this.things.rotation = this.add.group()
    var wordList = this.things.wordList
    var keys = Object.keys(wordList)
    var questionTypes = []
    for (let i = 0; i < 3; i++) questionTypes.push(randSplice(keys))
    this.things.questionTypes = questionTypes
    for (let index in questionTypes) {
      const question = randItem(wordList[questionTypes[index]]) + 'I'
      const configs = this.configTheQuestionCard(index)
      let card = new HorizontalCards(this, question, configs.x, configs.y, configs.scale, 1, true, null, true)
      card.type = questionTypes[index]
      this.things.questionCards.push(card)
    }

    this.addAnswers()
  }

  addAnswers () {
    let answers = []
    var wordList = this.things.wordList
    var questionTypes = this.things.questionTypes
    var questionCards = this.things.questionCards
    var fullWordList = []
    for (let index in questionTypes) {
      fullWordList = fullWordList.concat(wordList[questionTypes[index]])
    }

    this.things.fullWordList = fullWordList
    for (let index in questionCards) {
      let position = fullWordList.indexOf(questionCards[index].cardKey)
      if (position > -1) fullWordList.splice(position, 1)
    }

    for (let i = 0; i < 10; i++) {
      let item = randSplice(fullWordList)
      let answerHead = randItem(this.things.head)
      answers.push(item + answerHead)
    }

    answers = shuffle(answers)
    this.things.answerCards = []
    for (let index in answers) {
      let key = answers[index]
      let configs = this.configTheAnswerCard(index)
      var card = new HorizontalCards(this, key, configs.x, configs.y, configs.scale, 1, true, false, true, {}, false)
      for (let index in questionTypes) {
        let position = wordList[questionTypes[index]].indexOf(card.cardKey)
        if (position > -1) card.type = questionTypes[index]
      }
      this.input.setDraggable(card)
      this.things.answerCards.push(card)
    }
  }

  configTheQuestionCard (number) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSET_SPEC
    const startX = 100
    const endX = this.cameras.main.width - 100
    const column = 3
    const padding = parseInt(this.cameras.main.width * 0.01)
    const width = (endX - startX) / column
    const height = this.cameras.main.height / 4
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight

    const scale = Math.min(scaleX, scaleY)

    const y = this.cameras.main.height / 3
    const x = startX + (endX - startX) / column * number + width / 2

    return {
      x: x,
      y: y,
      scale: scale
    }
  }

  configTheAnswerCard (number, column = 5) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSET_SPEC

    const width = this.cameras.main.width / column
    const height = this.cameras.main.height / 5
    const scaleX = width / assetWidth
    const scaleY = height / assetHeight

    var scale = Math.min(scaleX, scaleY)
    var y = this.cameras.main.height / 4 * 3
    var x = number * width + width / 2

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
      var questionCards = this.things.questionCards
      let minY = this.cameras.main.height / 3  - questionCards[0].displayHeight / 2
      let maxY = this.cameras.main.height / 3 + questionCards[0].displayHeight / 2
      var win = false
      var is_choose = false
      if (pointer.y > minY && pointer.y < maxY) {
        var is_choose = true
        for (let index in questionCards) {
          var card = questionCards[index]
          let minX = card.x - card.displayWidth / 2
          let maxX = card.x + card.displayWidth / 2
          if (pointer.x > minX && pointer.x < maxX && card.type == gameObject.type) {
            win = true
            break
          }
        }
      }
      if (win) {
        this.playRightSound(1.5);
        var answerCards = this.things.answerCards
        for (let index in answerCards) {
          if (answerCards[index].cardKey == gameObject.cardKey) {
            answerCards.splice(index, 1)
          }
        }

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
        })

        if (answerCards.length > 4) this.rebuildAnswers()
        if (answerCards.length === 0) this.won()
      } else {
        this.time.delayedCall(1500, () => {
          if (is_choose) this.playWrongSound()
          gameObject.x = this.things.originalX
          gameObject.y = this.things.originalY
        })
      }
    })
  }

  rebuildAnswers () {
    var answerCards = this.things.answerCards
    for (let index in answerCards) {
      let configs = this.configTheAnswerCard(index)
      answerCards[index].x = configs.x
      answerCards[index].y = configs.y
    }
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
    this.scene.resume(MainGameScene.KEY, { from: MoveTheImagesToTheRightRroups.KEY, diamond: MoveTheImagesToTheRightRroups.WIN_DIAMOND })
  }
}

export default MoveTheImagesToTheRightRroups
