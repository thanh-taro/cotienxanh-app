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
import { destroyObject } from '../helpers'

class HomeScene extends Phaser.Scene {
  static get KEY () {
    return 'HomeScene'
  }

  constructor () {
    super({ key: HomeScene.KEY })

    this.things = {}
  }

  preload () {
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
    this.playWelcomeAudio()
    this.playBackgroundMusic()
    this.createBackgroundImage()
    this.createGameBloons()
    this.createCoinBadge()
    this.createMusicButton()
  }

  update (time, delta) {
    for (let index in this.things) if (this.things[index].update) this.things[index].update()
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

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  playWelcomeAudio () {
    if (this.things.isWelcomeAudioPlayed === undefined) {
      this.things.isWelcomeAudioPlayed = true
      this.sound.play(WelcomeAudio.KEY)
    }
  }

  playBackgroundMusic () {
    this.sound.play(BackgroundAudio.KEY, { loop: true, volume: 0.3 })
  }
}

export default HomeScene
