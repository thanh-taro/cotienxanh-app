import Phaser from 'phaser'
import BackButton from '../components/BackButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
import LevelHardButton from '../components/LevelHardButton'
import LevelHardestButton from '../components/LevelHardestButton'
import { destroyObject, addBee } from '../helpers'
import GameOneScene from './GameOneScene'
import FindPairScene from './FindPairScene';

class GameOneSubOneScene extends Phaser.Scene {
  static get KEY () {
    return 'GameOneSubOneScene'
  }

  constructor () {
    super({ key: GameOneSubOneScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.setBackground()

    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()
    this.createBackButton()
    this.createMusicButton()
    this.createLevelButtons()

    addBee(this)
  }

  forceRestart () {
    for (let index in this.things) {
      destroyObject(this.things[index])
      delete this.things[index]
    }
  }

  setBackground () {
    this.cameras.main.setBackgroundColor('#FCE4EC')

    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.height * 0.95
    const fontSize = Math.floor(this.cameras.main.height * 0.2)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Tìm cặp',
      style: {
        font: fontSize + 'px Quicksand',
        fill: '#ffffff'
      }
    })
    this.things.backgroundText.setOrigin(0.5, 1)
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

  createBackButton () {
    if (this.things.backButton === undefined) {
      const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
      this.things.backButton = new BackButton(this, GameOneScene.KEY)
      this.things.backButton.y = y
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) {
      this.things.levelEasyButton = new LevelEasyButton(this)
      this.things.levelEasyButton.setCallback(() => this.scene.start(FindPairScene.KEY, { level: 'easy' }))
    }
    if (this.things.levelNormalButton === undefined) {
      this.things.levelNormalButton = new LevelNormalButton(this)
      this.things.levelNormalButton.setCallback(() => this.scene.start(FindPairScene.KEY, { level: 'normal' }))
    }
    if (this.things.levelHardButton === undefined) {
      this.things.levelHardButton = new LevelHardButton(this)
      this.things.levelHardButton.setCallback(() => this.scene.start(FindPairScene.KEY, { level: 'hard' }))
    }
    if (this.things.levelHardestButton === undefined) {
      this.things.levelHardestButton = new LevelHardestButton(this)
      this.things.levelHardestButton.setCallback(() => this.scene.start(FindPairScene.KEY, { level: 'hardest' }))
    }
  }
}

export default GameOneSubOneScene
