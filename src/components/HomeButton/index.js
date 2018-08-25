import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
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

  addToScene (scene) {
    scene.add.existing(this)
    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
  }

  onPointerDown () {
    this.scene.sound.stopAll()
    this.scene.scene.start(HomeScene.KEY)
  }
}

export default HomeButton
