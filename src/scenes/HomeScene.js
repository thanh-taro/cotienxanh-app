import Phaser from 'phaser'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
import MusicButton from '../components/MusicButton'
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
    this.things.loadTimes = this.things.loadTimes === undefined ? 1 : this.things.loadTimes + 1

    this.createBackgroundImage()
    this.createGameBloons()
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

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }
}

export default HomeScene
