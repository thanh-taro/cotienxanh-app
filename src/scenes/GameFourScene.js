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
import { destroyObject, addBee } from '../helpers'
import ChooseTheRightPictureScene from './ChooseTheRightPictureScene'
import MoveTheImagesToTheRightGroups from './MoveTheImagesToTheRightGroups'
import MainGameScene from './MainGameScene'

class GameFourScene extends Phaser.Scene {
  static get KEY () {
    return 'GameFourScene'
  }

  static get GAME_SCENE_KEY () {
    return ChooseTheRightPictureScene.KEY
  }

  static get GAME_HARD_SCENE_KEY () {
    return MoveTheImagesToTheRightGroups.KEY
  }

  constructor () {
    super({ key: GameFourScene.KEY })

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
    const fontSize = Math.floor(this.cameras.main.height * 0.2)
    this.things.backgroundText = this.make.text({
      x: centerX,
      y: centerY,
      text: 'Thần đồng nhí',
      style: {
        font: fontSize + 'px Quicksand',
        fill: '#ffffff'
      }
    })
    this.things.backgroundText.setOrigin(0.5, 1)
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

      this.things.homeButton.setCallback(() => this.things.welcomeAudio.stop())
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createLevelButtons () {
    if (this.things.levelEasyButton === undefined) {
      this.things.levelEasyButton = new LevelEasyButton(this)
      this.things.levelEasyButton.setCallback(() => {
        this.things.welcomeAudio.stop()
        this.scene.start(MainGameScene.KEY, { forceRestart: true, gameSceneKey: GameFourScene.GAME_SCENE_KEY, level: 'easy' })
      })
    }
    if (this.things.levelNormalButton === undefined) {
      this.things.levelNormalButton = new LevelNormalButton(this)
      this.things.levelNormalButton.setCallback(() => {
        this.things.welcomeAudio.stop()
        this.scene.start(MainGameScene.KEY, { forceRestart: true, gameSceneKey: GameFourScene.GAME_SCENE_KEY, level: 'normal' })
      })
    }
    if (this.things.levelHardButton === undefined) {
      this.things.levelHardButton = new LevelHardButton(this)
      this.things.levelHardButton.setCallback(() => {
        this.things.welcomeAudio.stop()
        this.scene.start(MainGameScene.KEY, { forceRestart: true, gameSceneKey: GameFourScene.GAME_HARD_SCENE_KEY, level: 'hard' })
      })
    }
  }
}

export default GameFourScene
