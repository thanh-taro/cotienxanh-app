import Phaser from 'phaser'
import background from './background.jpg'

class HomeBackgroundImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'HomeBackgroundImage'
  }

  static preload (scene) {
    scene.load.image(HomeBackgroundImage.KEY, background)
  }

  constructor (scene, x, y, addToScene = true, config = {}) {
    super(scene, x, y, HomeBackgroundImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    const ratio = this.width / this.height
    this.displayWidth = scene.physics.world.bounds.width + 1
    this.displayHeight = Math.ceil(this.displayWidth / ratio)
    this.setPosition(0, scene.physics.world.bounds.height - this.displayHeight)

    scene.add.existing(this)
  }
}

export default HomeBackgroundImage
