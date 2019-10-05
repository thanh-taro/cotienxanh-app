import Phaser from 'phaser'
import { loadAsset, clearCaches } from '../../helpers'
import assetSpec from './asset-spec'
import HomeScene from '../../scenes/HomeScene'

class HomeButton extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'HomeButton'
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(HomeButton.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, y, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)

    const x = 8

    super(scene, x, y, HomeButton.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0)
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
    if (this.cb) this.cb()
    clearCaches(this)
    this.scene.scene.start(HomeScene.KEY)
  }
}

export default HomeButton
