import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'
import { destroyObject } from '../helpers'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'

class FindRightAnswerScene extends Phaser.Scene {
  static get KEY () {
    return 'FindRightAnswerScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: FindRightAnswerScene.KEY })
    this.things = {}
  }

  create (data) {
    this.cameras.main.setBackgroundColor('#4DD0E1')

    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()
    this.generate()
  }

  generate () {
    const level = this.things.level

    switch (level) {
      case 'easy':
        break

      case 'normal':
        break

      case 'hard':
      case 'hardest':
        break
    }
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, GameOneScene.KEY)
  }

  playRightSound (delay = 0) {
    if (this.things.rightSound === undefined) this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay })
  }

  playWrongSound (delay = 0) {
    if (this.things.wrongSound === undefined) this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay })
  }

  won () {
    this.scene.stop()
    this.scene.resume(MainGameScene.KEY, { from: FindRightAnswerScene.KEY, diamond: FindRightAnswerScene.WIN_DIAMOND })
  }
}

export default FindRightAnswerScene
