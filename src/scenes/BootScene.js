import Phaser from 'phaser'
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
import GameOneBackgroundAudio from '../components/GameOneBackgroundAudio'
import CollectCoinAudio from '../components/CollectCoinAudio'
import JumpAudio from '../components/JumpAudio'
import HitQuestSound from '../components/HitQuestSound'
import Setting from '../components/Setting'
import { destroyObject } from '../helpers'
import CoinBadge from '../components/CoinBadge'
import UserAvatar from '../components/UserAvatar'

class BootScene extends Phaser.Scene {
  static get KEY () {
    return 'BootScene'
  }

  constructor () {
    super({ key: BootScene.KEY })

    this.things = {}
  }

  preload () {
    UserAvatar.preload(this)
    LogoImage.preload(this)
    LogoAudio.preload(this)
    WelcomeAudio.preload(this)
    BackgroundAudio.preload(this)
    GameOneBackgroundAudio.preload(this)
    CollectCoinAudio.preload(this)
    JumpAudio.preload(this)
    HitQuestSound.preload(this)
    CoinBadge.preload(this)
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

    this.sound.play(WelcomeAudio.KEY)

    this.scene.start(HomeScene.KEY)
  }
}

export default BootScene
