import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class DiamondImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'DiamondImage'
  }

  static preload (scene) {
    const { asset } = loadAsset(scene, assetSpec)
    scene.load.image(DiamondImage.KEY, asset)
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)

    const x = scene.cameras.main.width / 2.7
    const y = 8

    super(scene, x, y, DiamondImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0.5)
    this.setScrollFactor(0)
    this.setScale(scale)
    this.y += this.displayHeight / 2

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }
}

export default DiamondImage
