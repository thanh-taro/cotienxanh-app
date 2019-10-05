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
import FormingAStoryGuideSound from '../components/FormingAStoryGuideSound'
import { destroyObject, addBee } from '../helpers'
import MainGameScene from './MainGameScene';
import GameTwoSubOneButton from '../components/GameTwoSubOneButton'
import GameTwoSubTwoButton from '../components/GameTwoSubTwoButton'
import GameTwoWelcomeAudio from '../components/GameTwoWelcomeAudio'

class GameTwoScene extends Phaser.Scene {
  static get KEY () {
    return 'GameTwoScene'
  }

  static get GAME_SCENE_KEY () {
    return FormingAStoryScene.KEY
  }

  constructor () {
    super({ key: GameTwoScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.setBackground()

    this.playWelcomeAudio()
    this.createCoinBadge()
    this.createDiamondBadge()
    this.createClockBadge()
    this.createBackToHomeButton()
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
    const fontSize = Math.floor(this.cameras.main.height * 0.15)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Vui kể chuyện',
      style: {
        font: fontSize + 'px Quicksand',
        fill: '#3034d3'
      }
    })
    this.things.backgroundText.setOrigin(0.5, 1)
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(GameTwoWelcomeAudio.KEY)
    this.things.welcomeAudio.play()
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
      this.things.homeButton.setCallback(() => this.things.welcomeAudio.stop())
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.subGameOneButton === undefined) this.things.subGameOneButton = new GameTwoSubOneButton(this)
    if (this.things.subGameTwoButton === undefined) this.things.subGameTwoButton = new GameTwoSubTwoButton(this)
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

export default GameTwoScene
