import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class LevelNormalButton extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'LevelNormalButton'
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(LevelNormalButton.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)

    const x = scene.cameras.main.width / 5 * 2
    const y = scene.cameras.main.height / 2

    super(scene, x, y, LevelNormalButton.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0.5, 0.5)
    this.setScale(scale)
    this.setScrollFactor(0)

    if (addToScene) this.addToScene(scene)
  }

  setCallback (cb) {
    this.cb = cb
  }

  addToScene (scene) {
    scene.add.existing(this)
    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    this.scene.things.welcomeAudio.stop()
    if (this.cb) this.cb()
  }
}

export default LevelNormalButton
