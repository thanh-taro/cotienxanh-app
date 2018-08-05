import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class LogoImage extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'LogoImage'
  }

  static preload (scene) {
    const asset = loadAsset(scene, assetSpec)
    scene.load.image(LogoImage.KEY, asset)
  }

  constructor (scene, x, y, addToScene = true, config = {}) {
    super(scene, x, y, LogoImage.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y, alpha: 0 })
    this.finished = 0

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
    this.play()
  }

  play () {
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 2000,
      onComplete: () => {
        this.scene.tweens.add({
          targets: this,
          delay: 1000,
          duration: 2000,
          alpha: 0,
          finished: 1
        })
      }
    })
  }
}

export default LogoImage
