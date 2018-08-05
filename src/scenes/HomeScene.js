import Phaser from 'phaser'

class HomeScene extends Phaser.Scene {
  static get KEY () {
    return 'HomeScene'
  }

  constructor () {
    super({ key: HomeScene.KEY })
  }

  create () {
    console.log(HomeScene.KEY)
  }
}

export default HomeScene
