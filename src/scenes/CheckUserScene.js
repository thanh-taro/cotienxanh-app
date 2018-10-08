import Phaser from 'phaser'
import Tingle from 'tingle.js'
import axios from 'axios'
import User from '../components/User'
import HomeScene from './HomeScene'

const registerFormHTML = '<h2 class="form-header">Đăng ký thông tin</h2><span class="hint">(vui lòng điền đầy đủ thông tin)</span><h4 class="input-label">Tên bé</h4><div><input type="text" name="name" class="input"></div><h4 class="input-label">Tuổi</h4><input type="radio" name="age" value="3" class="radio no-margin-left age-input"><span class="radio-value">3</span><input type="radio" name="age" value="4" class="radio age-input"><span class="radio-value">4</span><input type="radio" name="age" value="5" class="radio age-input"><span class="radio-value">5</span><input type="radio" name="age" value="6" class="radio age-input"><span class="radio-value">6</span><input type="radio" name="age" value="7" class="radio age-input">7<h4 class="input-label">Giới tính</h4><input type="radio" name="gender" value="male" class="radio no-margin-left gender-input"><span class="radio-value">Bé Trai</span><input type="radio" name="gender" value="female" class="radio gender-input"><span class="radio-value">Bé Gái</span>'

class CheckUserScene extends Phaser.Scene {
  static get KEY () {
    return 'CheckUserScene'
  }

  constructor () {
    super({ key: CheckUserScene.KEY })

    this.things = {}
  }

  create () {
    if (undefined !== User.currentUser()) this.moveToHome()
    else this.createLoginUI()
  }

  createLoginUI () {
    if (window.cordova) window.screen.orientation.lock('portrait-primary')

    const Modal = Tingle.modal

    this.things.loginModal = new Modal({
      footer: true,
      closeMethods: []
    })

    this.things.loginModal.setContent(registerFormHTML)

    this.things.loginModal.addFooterBtn('ĐĂNG KÝ', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', () => {
      this.register()
    })

    this.things.loginModal.open()
  }

  register () {
    const nameHandler = document.querySelector('input[name=name]')
    const ageHandler = document.getElementsByClassName('age-input')
    const genderHandler = document.getElementsByClassName('gender-input')

    let name, age, gender

    name = nameHandler.value

    for (let index = 0; index < ageHandler.length; index++) {
      let ageInput = ageHandler[index]
      if (ageInput.checked) {
        age = ageInput.value
        break
      }
    }

    for (let index = 0; index < genderHandler.length; index++) {
      let genderInput = genderHandler[index]
      if (genderInput.checked) {
        gender = genderInput.value
        break
      }
    }

    if (name.length > 0 && undefined !== age && undefined !== gender) {
      axios.post('http://cotienxanh.edu.vn/api/register', { name, age, gender }).then((response) => {
        const user = response.data
        User.storeUser(user)
        this.things.loginModal.destroy()
        this.moveToHome(true)
      })
    }
  }

  moveToHome (changeOrientation = false) {
    if (changeOrientation) if (window.cordova) window.screen.orientation.lock('landscape')

    this.scene.start(HomeScene.KEY)
  }
}

export default CheckUserScene
