import Phaser from 'phaser'
import BackButton from '../components/BackButton'
import MusicButton from '../components/MusicButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
import MainGameScene from './MainGameScene'
import FormingAStoryScene from './FormingAStoryScene'
import FormingAStoryGuideSound from '../components/FormingAStoryGuideSound'
import { destroyObject, addBee } from '../helpers'
import GameTwoScene from './GameTwoScene'

class GameTwoSubOneScene extends Phaser.Scene {
  static get KEY () {
    return 'GameTwoSubOneScene'
  }

  static get GAME_SCENE_KEY () {
    return FormingAStoryScene.KEY
  }

  constructor () {
    super({ key: GameTwoSubOneScene.KEY })

    this.things = {}
  }

  create (data) {
    this.forceRestart()
    this.setBackground()

    this.playWelcomeAudio()
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
      text: 'Thông minh tinh mắt',
      style: {
        font: fontSize + 'px Quicksand',
        fill: '#b09963'
      }
    })
    this.things.backgroundText.setOrigin(0.5, 1)
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(FormingAStoryGuideSound.KEY)
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

  createBackButton () {
    destroyObject(this.things.backButton)
    const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
    this.things.backButton = new BackButton(this, GameTwoScene.KEY, () => this.things.welcomeAudio.stop(), true, {}, true, y)
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) {
      this.things.levelEasyButton = new LevelEasyButton(this)
      this.things.levelEasyButton.setCallback(() => this.scene.start(MainGameScene.KEY, {parentSceneKey: GameTwoSubOneScene.KEY, forceRestart: true, gameSceneKey: GameTwoSubOneScene.GAME_SCENE_KEY, level: 'easy' }))
    }
    if (this.things.levelNormalButton === undefined) {
      this.things.levelNormalButton = new LevelNormalButton(this)
      this.things.levelNormalButton.setCallback(() => this.scene.start(MainGameScene.KEY, {parentSceneKey: GameTwoSubOneScene.KEY, forceRestart: true, gameSceneKey: GameTwoSubOneScene.GAME_SCENE_KEY, level: 'normal' }))
    }
  }
}

export default GameTwoSubOneScene
