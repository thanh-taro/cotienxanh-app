import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class CoinImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'CoinImage'
  }

  static preload (scene) {
    const { asset } = loadAsset(scene, assetSpec)
    scene.load.image(CoinImage.KEY, asset)
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)

    const x = 8
    const y = 8

    super(scene, x, y, CoinImage.KEY)

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

export default CoinImage
