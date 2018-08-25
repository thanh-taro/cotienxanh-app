import Phaser from 'phaser'
import LogoImage from '../components/LogoImage'
import LogoAudio from '../components/LogoAudio'
import Setting from '../components/Setting'
import GameOneWelcomeAudio from '../components/GameOneWelcomeAudio'
import GameOneBackgroundAudio from '../components/GameOneBackgroundAudio'
import GameOneTilemap from '../components/GameOneTilemap'
import GameOnePlayer from '../components/GameOnePlayer'
import GamePadLeftButton from '../components/GamePadLeftButton'
import GamePadRightButton from '../components/GamePadRightButton'
import GamePadUpButton from '../components/GamePadUpButton'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'
import CollectCoinAudio from '../components/CollectCoinAudio'
import HitQuestSound from '../components/HitQuestSound'
import JumpAudio from '../components/JumpAudio'
import BackButton from '../components/BackButton'
import CoinBadge from '../components/CoinBadge'
import WelcomeAudio from '../components/WelcomeAudio'
import BackgroundAudio from '../components/BackgroundAudio'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
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
    this.makeLoadBar()

    LogoImage.preload(this)
    LogoAudio.preload(this)
    GameOneWelcomeAudio.preload(this)
    GameOneBackgroundAudio.preload(this)
    GameOneTilemap.preload(this)
    GamePadLeftButton.preload(this)
    GamePadRightButton.preload(this)
    GamePadUpButton.preload(this)
    GameOnePlayer.preload(this)
    CollectCoinAudio.preload(this)
    JumpAudio.preload(this)
    HitQuestSound.preload(this)
    HomeButton.preload(this)
    BackButton.preload(this)
    CoinBadge.preload(this)
    HomeBackgroundImage.preload(this)
    GameOneBloonImage.preload(this)
    GameTwoBloonImage.preload(this)
    GameThreeBloonImage.preload(this)
    GameFourBloonImage.preload(this)
    MusicButton.preload(this)
    BackgroundAudio.preload(this)
    WelcomeAudio.preload(this)
  }

  create () {
    if (!Setting.MUSIC_ENABLED) this.sound.setMute(true)

    this.things.logoImage = this.makeLogoImage()
    this.sound.play(LogoAudio.KEY)
  }

  update () {
    if (this.things.logoImage.finished === 1) this.moveToHome()
  }

  makeLoadBar () {
    this.things.progress = this.add.graphics()
    this.load.on('progress', (value) => {
      this.things.progress.clear()
      this.things.progress.fillStyle(0x66bb6a, 1)
      this.things.progress.fillRect(0, this.cameras.main.centerY, this.cameras.main.width * value, 10)
    })
    this.load.on('complete', () => {
      this.things.progress.destroy()
    })
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
