import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'
import GameOneSubFourScene from '../../scenes/GameOneSubFourScene'

class GameOneSubFourButton extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'GameOneSubFourButton'
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(GameOneSubFourButton.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)

    const x = scene.cameras.main.width / 3 * 2
    const y = scene.cameras.main.height / 3 * 2

    super(scene, x, y, GameOneSubFourButton.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0.5, 0.5)
    this.setScale(scale)
    this.setScrollFactor(0)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    this.scene.scene.start(GameOneSubFourScene.KEY)
  }
}

export default GameOneSubFourButton
