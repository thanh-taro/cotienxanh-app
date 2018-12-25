import Phaser from 'phaser'
import BackButton from '../components/BackButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import GameOneSubOneButton from '../components/GameOneSubOneButton'
import GameOneSubTwoButton from '../components/GameOneSubTwoButton'
import GameOneSubThreeButton from '../components/GameOneSubThreeButton'
import GameOneSubFourButton from '../components/GameOneSubFourButton'
import GameOneScene from './GameOneScene'
import { destroyObject, addBee } from '../helpers'

class GameOneListScene extends Phaser.Scene {
  static get KEY () {
    return 'GameOneListScene'
  }

  constructor () {
    super({ key: GameOneListScene.KEY })

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
    this.createSubGameButtons()

    addBee(this)
  }

  forceRestart () {
    for (let index in this.things) {
      destroyObject(this.things[index])
      delete this.things[index]
    }
  }

  setBackground () {
    this.cameras.main.setBackgroundColor('#DAF7A6')

    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.height * 0.95
    const fontSize = Math.floor(this.cameras.main.height * 0.1)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Bé thử tài',
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

  createSubGameButtons () {
    if (this.things.subGameOneButton === undefined) this.things.subGameOneButton = new GameOneSubOneButton(this)
    if (this.things.subGameTwoButton === undefined) this.things.subGameTwoButton = new GameOneSubTwoButton(this)
    if (this.things.subGameThreeButton === undefined) this.things.subGameThreeButton = new GameOneSubThreeButton(this)
    if (this.things.subGameFourButton === undefined) this.things.subGameFourButton = new GameOneSubFourButton(this)
  }
}

export default GameOneListScene
