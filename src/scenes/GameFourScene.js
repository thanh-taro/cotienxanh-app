import Phaser from 'phaser'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import GameFourWelcomeAudio from '../components/GameFourWelcomeAudio'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
import LevelHardButton from '../components/LevelHardButton'
import LevelHardestButton from '../components/LevelHardestButton'
import { destroyObject } from '../helpers'

class GameFourScene extends Phaser.Scene {
  static get KEY () {
    return 'GameFourScene'
  }

  constructor () {
    super({ key: GameFourScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.cameras.main.setBackgroundColor('#FCE4EC')

    this.playWelcomeAudio()
    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()
    this.createBackToHomeButton()
    this.createMusicButton()
    this.createLevelButtons()
  }

  forceRestart () {
    for (let index in this.things) {
      destroyObject(this.things[index])
      delete this.things[index]
    }
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(GameFourWelcomeAudio.KEY)
    this.things.welcomeAudio.play()
  }

  stopWelcomeAudio () {
    this.things.welcomeAudio.stop()
  }

  createCoinBadge () {
    if (this.things.coinBadge === undefined) this.things.coinBadge = new CoinBadge(this)
  }

  createDiamondBadge () {
    if (this.things.diamondBadge === undefined) this.things.diamondBadge = new DiamondBadge(this)
  }

  createClockBadge () {
    if (this.things.clockBadge === undefined) this.things.clockBadge = new ClockBadge(this)
  }

  createBackToHomeButton () {
    if (this.things.homeButton === undefined) {
      const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
      this.things.homeButton = new HomeButton(this, y)

      // force to update coin to server
      this.things.homeButton.setCallback(() => {
        this.things.coinBadge.addCoin(0, true)
        this.things.welcomeAudio.stop()
      })
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) this.things.levelEasyButton = new LevelEasyButton(this)
    if (this.things.levelNormalButton === undefined) this.things.levelNormalButton = new LevelNormalButton(this)
    if (this.things.levelHardButton === undefined) this.things.levelHardButton = new LevelHardButton(this)
    if (this.things.levelHardestButton === undefined) this.things.levelHardestButton = new LevelHardestButton(this)
  }
}

export default GameFourScene
