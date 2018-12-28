import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class Arrow extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'Arrow'
  }

  static get ASSET_SPEC () {
    return assetSpec
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(Arrow.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, x, y, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)

    super(scene, x, y, Arrow.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setScale(scale)

    if (addToScene) scene.add.existing(this)
  }
}

export default Arrow
