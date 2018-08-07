import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'
import Setting from '../Setting'

class MusicButton extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'MusicButton'
  }

  static preload (scene) {
    const { asset, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    scene.load.spritesheet(MusicButton.KEY, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)
    const x = scene.cameras.main.width - 16
    const y = 16

    super(scene, x, y, MusicButton.KEY, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(1, 0)
    this.setScale(scale)
    this.setScrollFactor(0)
    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    if (Setting.MUSIC_ENABLED === true) this.setFrame(0)
    else this.setFrame(3)

    scene.add.existing(this)
  }

  onPointerDown () {
    const settingValue = !Setting.MUSIC_ENABLED

    Setting.MUSIC_ENABLED = settingValue

    if (settingValue === true) this.setFrame(0)
    else this.setFrame(3)

    this.emit('settingchange', settingValue)
  }
}

export default MusicButton
