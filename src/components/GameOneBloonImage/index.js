import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'
import GameOneScene from '../../scenes/GameOneScene'

class GameOneBloonImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'GameOneBloonImage'
  }

  static preload (scene) {
    const { asset } = loadAsset(scene, assetSpec)
    scene.load.image(GameOneBloonImage.KEY, asset)
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)
    const y = scene.physics.world.bounds.centerY
    const x = scene.physics.world.bounds.width / 5 * 1
    const rangeY = 3

    super(scene, x, y, GameOneBloonImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y: y + rangeY })

    this.saveY = y
    this.rangeY = rangeY
    this.setScale(scale)

    if (addToScene) this.addToScene(scene)
  }

  update () {
    let { direction, saveY, rangeY, y } = this

    if (y <= saveY - rangeY && direction !== 'up') {
      this.direction = 'up'
      this.scene.tweens.add({
        targets: this,
        y: saveY + rangeY,
        duration: 600
      })
    } else if (y >= saveY + rangeY && direction !== 'down') {
      this.direction = 'down'
      this.scene.tweens.add({
        targets: this,
        y: saveY - rangeY,
        duration: 600
      })
    }
  }

  addToScene (scene) {
    scene.add.existing(this)
    scene.updates.add(this)

    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()
    this.scene.things.welcomeAudio.stop()
    this.scene.scene.start(GameOneScene.KEY, { forceRestart: true })
  }
}

export default GameOneBloonImage
