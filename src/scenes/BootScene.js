import Phaser from 'phaser'
import HomeScene from './HomeScene'
import LogoImage from '../components/LogoImage'

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
  }

  create () {
    this.things.logoImage = this.makeLogoImage()
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
