import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class GamePadUpButton extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'GamePadUpButton'
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(GamePadUpButton.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, onDown, onRelease, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)
    const x = scene.cameras.main.width - 8
    const y = scene.cameras.main.height - 8

    super(scene, x, y, GamePadUpButton.KEY, 0)
    this.onDown = onDown
    this.onRelease = onRelease

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y, alpha: 0.2 })
    this.setOrigin(1, 1)
    this.setScale(scale)
    this.setScrollFactor(0)
    this.setInteractive()
    this.setFrame(2)
    this.on('pointerdown', this.onPointerDown, this)
    this.on('pointerup', this.onPointerRelease, this)
    this.on('pointerout', this.onPointerRelease, this)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  onPointerDown () {
    this.setFrame(1)
    this.setAlpha(1)

    this.emit('down')
  }

  onPointerRelease () {
    this.setFrame(2)
    this.setAlpha(0.2)

    this.emit('release')
  }
}

export default GamePadUpButton
