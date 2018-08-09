import Phaser from 'phaser'
import SoundManager from '../components/SoundManager'
import LogoImage from '../components/LogoImage'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
import MusicButton from '../components/MusicButton'
import HomeButton from '../components/HomeButton'
import GameOneTilemap from '../components/GameOneTilemap'
import GamePadLeftButton from '../components/GamePadLeftButton'
import GamePadRightButton from '../components/GamePadRightButton'
import GamePadUpButton from '../components/GamePadUpButton'
import GameOnePlayer from '../components/GameOnePlayer'
import HomeScene from './HomeScene'
import LogoAudio from '../components/LogoAudio'
import BackgroundAudio from '../components/BackgroundAudio'
import WelcomeAudio from '../components/WelcomeAudio'
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
    SoundManager.preload(this)
    HomeBackgroundImage.preload(this)
    GameOneBloonImage.preload(this)
    GameTwoBloonImage.preload(this)
    GameThreeBloonImage.preload(this)
    GameFourBloonImage.preload(this)
    MusicButton.preload(this)
    HomeButton.preload(this)
    GameOneTilemap.preload(this)
    GamePadLeftButton.preload(this)
    GamePadRightButton.preload(this)
    GamePadUpButton.preload(this)
    GameOnePlayer.preload(this)
  }

  create () {
    this.things.logoImage = this.makeLogoImage()
    SoundManager.play(this, LogoAudio.KEY, { playOnce: true })
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

    SoundManager.play(this, BackgroundAudio.KEY, { loop: true, volume: 0.3 })
    SoundManager.play(this, WelcomeAudio.KEY, { playOnce: true })

    this.scene.start(HomeScene.KEY)
  }
}

export default BootScene
