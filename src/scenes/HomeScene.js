import Phaser from 'phaser'
import HomeBackgroundImage from '../components/HomeBackgroundImage'

class HomeScene extends Phaser.Scene {
  static get KEY () {
    return 'HomeScene'
  }

  constructor () {
    super({ key: HomeScene.KEY })

    this.things = {}
  }

  create () {
    this.things.backgroundImage = new HomeBackgroundImage(this, 0, 0)
  }
}

export default HomeScene
