import Phaser from 'phaser'
import HomeScene from './HomeScene'
import LogoImage from '../components/LogoImage'
import LogoAudio from '../components/LogoAudio'
import HomeAudio from '../components/HomeAudio'
import WelcomeAudio from '../components/WelcomeAudio'
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
    HomeAudio.preload(this)
    WelcomeAudio.preload(this)
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
    LogoAudio.make(this).play()
  }

  update () {
    if (this.things.logoImage.finished === 1) this.moveToHome()
  }

  makeLogoImage () {
    return new LogoImage(this, this.physics.world.bounds.centerX, this.physics.world.bounds.centerY)
  }

  moveToHome () {
    this.things.logoImage.destroy()
    this.things.logoImage = null
    this.things = null

    this.scene.start(HomeScene.KEY)
  }
}

export default BootScene
