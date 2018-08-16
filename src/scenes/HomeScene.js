import Phaser from 'phaser'
import BackgroundAudio from '../components/BackgroundAudio'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
import MusicButton from '../components/MusicButton'
import { destroyObject } from '../helpers'
import CoinBadge from '../components/CoinBadge'
import UserAvatar from '../components/UserAvatar'

class HomeScene extends Phaser.Scene {
  static get KEY () {
    return 'HomeScene'
  }

  constructor () {
    super({ key: HomeScene.KEY })

    this.things = {}
  }

  create () {
    this.sound.play(BackgroundAudio.KEY, { loop: true, volume: 0.3 })

    this.createBackgroundImage()
    this.createGameBloons()
    this.createUserAvatar()
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

  createUserAvatar () {
    destroyObject(this.things.coinBadge)

    this.things.userAvatar = new UserAvatar(this)
  }

  createCoinBadge () {
    destroyObject(this.things.coinBadge)

    const x = this.things.userAvatar.x + this.things.userAvatar.displayWidth + 8
    this.things.coinBadge = new CoinBadge(this, x)
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }
}

export default HomeScene
