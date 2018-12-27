import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import HomeButton from '../components/HomeButton'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import { destroyObject } from '../helpers'

class LittleTalentScene extends Phaser.Scene {
  static get KEY () {
    return 'LittleTalentScene'
  }

  static get WIN_COIN () {
    return 100
  }

  constructor () {
    super({ key: LittleTalentScene.KEY })
    this.things = {}
  }

  create (data) {
    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()

    this.createMusicButton()
    this.createBackToHomeButton()

    this.cameras.main.setBackgroundColor('#3E2723')

    this.things.level = data.level
  }

  generate () {
    // const level = this.things.level
  }

  createBackToHomeButton () {
    destroyObject(this.things.homeButton)
    const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
    this.things.homeButton = new HomeButton(this, y)

    // force to update coin to server
    this.things.homeButton.setCallback(() => this.things.coinBadge.addCoin(0, true))
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)
    this.things.musicButton = new MusicButton(this)
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

  playRightSound (delay = 0) {
    destroyObject(this.things.rightSound)
    this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay })
  }

  playWrongSound (delay = 0) {
    destroyObject(this.things.wrongSound)
    this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay })
  }
}

export default LittleTalentScene
