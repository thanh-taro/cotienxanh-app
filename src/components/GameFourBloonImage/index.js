import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class GameFourBloonImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'GameFourBloonImage'
  }

  static preload (scene) {
    const asset = loadAsset(scene, assetSpec)
    scene.load.image(GameFourBloonImage.KEY, asset)
  }

  constructor (scene, addToScene = true, config = {}) {
    const y = scene.physics.world.bounds.centerY
    const x = scene.physics.world.bounds.width / 5 * 4
    super(scene, x, y, GameFourBloonImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }
}

export default GameFourBloonImage
