import Phaser from 'phaser'
import WelcomeAudio from '../components/WelcomeAudio'
import BackgroundAudio from '../components/BackgroundAudio'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import { destroyObject } from '../helpers'

class HomeScene extends Phaser.Scene {
  static get KEY () {
    return 'HomeScene'
  }

  constructor () {
    super({ key: HomeScene.KEY })

    this.things = {}
  }

  create () {
    this.playWelcomeAudio()
    this.playBackgroundMusic()
    this.createBackgroundImage()
    this.createGameBloons()
    this.createCoinBadge()
    this.createClockBadge()
    this.createDiamondBadge()
    this.createMusicButton()
  }

  createBackgroundImage () {
    destroyObject(this.things.backgroundImage)

    this.things.backgroundImage = new HomeBackgroundImage(this, 0, 0)
  }

  createGameBloons () {
    destroyObject(this.things.gameOneBloonImage)
    destroyObject(this.things.gameTwoBloonImage)
    destroyObject(this.things.gameThreeBloonImage)
    destroyObject(this.things.gameFourBloonImage)

    this.things.gameOneBloonImage = new GameOneBloonImage(this)
    this.things.gameTwoBloonImage = new GameTwoBloonImage(this)
    this.things.gameThreeBloonImage = new GameThreeBloonImage(this)
    this.things.gameFourBloonImage = new GameFourBloonImage(this)
  }

  createCoinBadge () {
    destroyObject(this.things.coinBadge)

    this.things.coinBadge = new CoinBadge(this)
  }

  createDiamondBadge () {
    destroyObject(this.things.diamondBadge)

    this.things.diamondBadge = new DiamondBadge(this)
  }

  createClockBadge () {
    destroyObject(this.things.clockBadge)

    this.things.clockBadge = new ClockBadge(this)
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(WelcomeAudio.KEY)
    if (this.things.isWelcomeAudioPlayed === undefined) {
      this.things.isWelcomeAudioPlayed = true
      this.things.welcomeAudio.play({ volume: 0.7 })
    }
  }

  playBackgroundMusic () {
    if (this.things.backgroundMusic === undefined) {
      this.things.backgroundMusic = this.sound.add(BackgroundAudio.KEY)
      this.things.backgroundMusic.play({ loop: true, volume: 0.25 })
    }
  }
}

export default HomeScene
