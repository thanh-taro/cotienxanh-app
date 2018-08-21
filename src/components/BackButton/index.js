import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class BackButton extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'BackButton'
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(BackButton.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, parentScene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)
    const x = 8
    const y = 8

    super(scene, x, y, BackButton.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0)
    this.setScale(scale)
    this.setScrollFactor(0)
    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
    this.parentScene = parentScene

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    this.setFrame(0)

    scene.add.existing(this)
  }

  onPointerDown () {
    this.scene.scene.stop()
    this.scene.scene.resume(this.parentScene)
  }
}

export default BackButton
