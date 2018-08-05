import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class GameOneBloonImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'GameOneBloonImage'
  }

  static preload (scene) {
    const asset = loadAsset(scene, assetSpec)
    scene.load.image(GameOneBloonImage.KEY, asset)
  }

  constructor (scene, addToScene = true, config = {}) {
    const y = scene.physics.world.bounds.centerY
    const x = scene.physics.world.bounds.width / 5 * 1
    super(scene, x, y, GameOneBloonImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }
}

export default GameOneBloonImage
