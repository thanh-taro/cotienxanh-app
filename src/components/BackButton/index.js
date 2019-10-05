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

  constructor (scene, parentScene, cb, addToScene = true, config = {}, start = false, y = false) {
    const { scale } = loadAsset(scene, assetSpec)
    const x = 8
    if (y === false) {
      y = 8
    }

    super(scene, x, y, BackButton.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0)
    this.setScale(scale)
    this.setScrollFactor(0)
    this.parentScene = parentScene
    this.start = start
    this.cb = cb

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    this.setFrame(0)

    scene.add.existing(this)
    scene.updates.add(this)

    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
    this.escKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    if (this.cb) this.cb()
    this.scene.scene.stop()
    if (this.start) {
      this.scene.scene.start(this.parentScene, {})
    } else {
      this.scene.scene.resume(this.parentScene)
    }
  }

  update () {
    if (this.escKey.isDown) {
      this.cb()
      this.scene.scene.stop()
      this.scene.scene.resume(this.parentScene)
      this.escKey.reset()
    }
  }
}

export default BackButton
