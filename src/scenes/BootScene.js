import Phaser from 'phaser'
import LogoImage from '../components/LogoImage'
import LogoAudio from '../components/LogoAudio'
import Setting from '../components/Setting'
import HomeScene from './HomeScene'
import { destroyObject } from '../helpers'

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
  }

  create () {
    if (!Setting.MUSIC_ENABLED) this.sound.setMute(true)

    this.things.logoImage = this.makeLogoImage()
    this.sound.play(LogoAudio.KEY)
  }

  update () {
    if (this.things.logoImage.finished === 1) this.moveToHome()
  }

  makeLogoImage () {
    return new LogoImage(this, this.physics.world.bounds.centerX, this.physics.world.bounds.centerY)
  }

  moveToHome () {
    destroyObject(this.things.logoImage)

    this.input.addPointer(3)

    this.scene.start(HomeScene.KEY)
  }
}

export default BootScene
