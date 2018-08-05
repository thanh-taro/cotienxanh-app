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
    const rangeY = 3
    super(scene, x, y, GameFourBloonImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y: y + rangeY })

    this.saveY = y
    this.rangeY = rangeY

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
  }
}

export default GameFourBloonImage
