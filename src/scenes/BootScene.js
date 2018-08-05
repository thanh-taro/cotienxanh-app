import Phaser from 'phaser'
import HomeScene from './HomeScene'
import LogoImage from '../components/LogoImage'
import LogoAudio from '../components/LogoAudio'
import HomeBackgroundImage from '../components/HomeBackgroundImage'

class BootScene extends Phaser.Scene {
  static get KEY () {
    return 'BootScene'
  }

  constructor () {
    super({ key: BootScene.KEY })

    this.things = {}
  }

  preload () {
    LogoImage.preload(this)
    LogoAudio.preload(this)
    HomeBackgroundImage.preload(this)
  }

  create () {
    this.things.logoImage = this.makeLogoImage()
    LogoAudio.make(this).play()
  }

  update () {
    if (this.things.logoImage.finished === 1) this.moveToHome()
  }

  makeLogoImage () {
    return new LogoImage(this, this.physics.world.bounds.centerX, this.physics.world.bounds.centerY)
  }

  moveToHome () {
    this.things = null
    delete this.things

    this.scene.start(HomeScene.KEY)
  }
}

export default BootScene
