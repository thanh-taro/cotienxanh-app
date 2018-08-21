import Phaser from 'phaser'
import { destroyObject } from '../helpers'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'

class FindPairScene extends Phaser.Scene {
  static get KEY () {
    return 'FindPairScene'
  }

  constructor () {
    super({ key: FindPairScene.KEY })

    this.things = {}
  }

  create () {
    this.cameras.main.setBackgroundColor('#000000')

    this.createMusicButton()
    this.createBackButton()
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, GameOneScene.KEY)
  }
}

export default FindPairScene
