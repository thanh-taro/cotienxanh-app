import Phaser from 'phaser'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
import FormingAStoryScene from './FormingAStoryScene'
import CeremonySound from '../components/CeremonySound'

import { destroyObject, addBee } from '../helpers'

class GameTwoSubOneScene extends Phaser.Scene {
  static get KEY () {
    return 'GameTwoSubOneScene'
  }

  constructor () {
    super({ key: GameTwoSubOneScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.setBackground()

    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()
    this.createBackToHomeButton()
    this.createMusicButton()
    this.createLevelButtons()

    if (data) {
      const { coin } = data
      if (undefined !== coin) this.won(data)
    }

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
    const fontSize = Math.floor(this.cameras.main.height * 0.15)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Kể chuyện sáng tạo',
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

  createBackToHomeButton () {
    if (this.things.homeButton === undefined) {
      const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
      this.things.homeButton = new HomeButton(this, y)
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) {
      this.things.levelEasyButton = new LevelEasyButton(this)
      this.things.levelEasyButton.setCallback(() => this.scene.start(FormingAStoryScene.KEY, { level: 'easy' }))
    }
    if (this.things.levelNormalButton === undefined) {
      this.things.levelNormalButton = new LevelNormalButton(this)
      this.things.levelNormalButton.setCallback(() => this.scene.start(FormingAStoryScene.KEY, { level: 'normal' }))
    }
  }

  won (data) {
    if (undefined !== data && undefined !== data.from) {
      this.playCeremonyAudio()
      this.things.diamondBadge.addDiamond(data.diamond)
    }
  }

  playCeremonyAudio () {
    if (this.things.ceremonyAudio === undefined) this.things.ceremonyAudio = this.sound.add(CeremonySound.KEY)
    this.things.ceremonyAudio.play({ volume: 0.4 })
  }
}

export default GameTwoSubOneScene
