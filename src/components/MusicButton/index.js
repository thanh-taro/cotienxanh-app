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
    const x = scene.cameras.main.width - 8
    const y = 8

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
    else this.setFrame(1)

    scene.add.existing(this)
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()

    const enabled = !Setting.MUSIC_ENABLED

    Setting.MUSIC_ENABLED = enabled

    if (enabled) this.enableSounds()
    else this.disableSounds()
  }

  disableSounds () {
    this.setFrame(1)
    this.scene.sound.setMute(true)
  }

  enableSounds () {
    this.setFrame(0)
    this.scene.sound.setMute(false)
  }
}

export default MusicButton
