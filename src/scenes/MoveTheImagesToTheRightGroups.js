import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import Arrow from '../components/Arrow'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import MainGameScene from './MainGameScene'
import WrongSound from '../components/WrongSound'
import { destroyObject, randItem, randSplice, shuffle, clearCaches } from '../helpers'

class MoveTheImagesToTheRightGroups extends Phaser.Scene {
  static get KEY () {
    return 'MoveTheImagesToTheRightGroups'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: MoveTheImagesToTheRightGroups.KEY })
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
        'Chủ_đề_ký_hiệu': ['Bệnh_viện', 'Bưu_điện', 'Cấm_đổ_xe', 'Cấm_vứt_rác', 'Cảnh_sát', 'Chùa', 'Có_bậc_thang', 'Đồng_ý', 'Ga_tàu', 'Giữ_im_lặng', 'Kí_hiệu_sân_bay', 'Lối_thoát_hiểm', 'Người_khuyết_tật', 'Nhà_vệ_sinh_nữ', 'Nơi_bỏ_rác', 'Sân_bay', 'Siêu_thị', 'Thuốc_lá', 'Trạm_xăng', 'Trường_học'],
        'Chủ_đề_ký_hiệu_trong_lớp': ['Bảng_danh_sách_lớp', 'Bảng_phân_chia_thức_ăn', 'Bảng_tên_lớp', 'Bảng_thực_đơn', 'Góc_âm_nhạc', 'Góc_cảm_xúc', 'Góc_chữ_cái', 'Góc_chuyên_cần', 'Góc_đóng_vai', 'Góc_học_tập', 'Góc_sinh_nhật', 'Góc_tạo_hình', 'Góc_toán', 'Khu_nhà_bếp', 'Khu_thể_chất', 'Khu_vệ_sinh', 'Khu_vui_chơi_ngoài_trời'],
        'Chủ_đề_màu_sắc': ['Màu_nâu', 'Màu_tím', 'Màu_hồng', 'Màu_trắng', 'Màu_đen', 'Màu_đỏ', 'Màu_cam', 'Màu_vàng', 'Màu_xanh_lá', 'Màu_xám'],
        'Chủ_đề_bác_sĩ': ['bac_si', 'bang_dan_ca_nhan', 'bong_y_te', 'cai_nang', 'can_y_te', 'con_y_te', 'dao_phau_thuat', 'hop_cuu_thuong', 'kep_y_te', 'khau_trang_y_te', 'may_do_huyet_ap', 'nhiet_ke', 'ong_nghe', 'ong_tiem', 'quan_ao_bac_si', 'thuoc', 'xe_cuu_thuong', 'xe_lan', ],
        'Chủ_đề_cảnh_sát': ['canh_sat', 'khau_sung', 'xe_canh_sat', 'coi_canh_sat', 'la_chan_chong_bao_dong', 'xe_mo_to_canh_sat', 'cong_tay', 'may_bo_dam', 'dui_cui', 'mu_canh_sat', ],
        'Chủ_đề_cứu_hỏa': ['binh_chua_chay', 'linh_cuu_hoa', 'mu_cuu_hoa', 'bo_do_cuu_hoa', 'loa', 'ung_cao_su', 'gang_tay_cao_su', 'may_bom_cuu_hoa', 'xe_cuu_hoa', ],
        'Chủ_đề_đầu_bếp': ['am_sieu_toc', 'cai_thot', 'lo_dung_gia_vi', 'bo_dao', 'cay_can_bot', 'may_xay_thuc_pham', 'cai_chao', 'dau_bep', 'mu_dau_bep', 'cai_noi', 'do_danh_trung', 'tap_de', 'cai_ro', 'khay_nuong', ],
        'Chủ_đề_kỹ_sư': ['cai_bua', 'cai_kim', 'ky_su', 'sung_bom_dau', 'cai_cua', 'co_le', 'mo_han', 'thuoc_cuon', 'cai_duc', 'den_pin', 'mo_let', 'tuoc_no_vic', 'cai_giua', 'dong_ho_do', 'mu_ky_su', 'cai_khoan', 'hop_dung_cu', 'sung_ban_ding', ]
      },
      head: ['I'],
      'questionCards': []
    }
    this.cameras.main.setBackgroundColor('#ffa6f7')

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
      const question = questionTypes[index]
      const configs = this.configTheQuestionCard(index)
      let card = new HorizontalCards(this, question + 'I', configs.x, configs.y, configs.scale, 1, true, null, true)
      card.type = question
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
        this.playRightSound(2.5);
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
        this.time.delayedCall(2500, () => {
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
    clearCaches(this)
    this.scene.stop()
    this.scene.resume(MainGameScene.KEY, { from: MoveTheImagesToTheRightGroups.KEY, diamond: MoveTheImagesToTheRightGroups.WIN_DIAMOND })
  }
}

export default MoveTheImagesToTheRightGroups
