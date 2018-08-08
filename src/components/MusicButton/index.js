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
    this.soundStates = {}
    this.on('pointerdown', this.onPointerDown, this)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    if (Setting.MUSIC_ENABLED === true) this.setFrame(0)
    else this.setFrame(3)

    scene.add.existing(this)
  }

  onPointerDown () {
    const enabled = !Setting.MUSIC_ENABLED

    Setting.MUSIC_ENABLED = enabled

    if (enabled) this.enableSounds()
    else this.disableSounds()
  }

  disableSounds () {
    this.setFrame(3)

    for (let index in this.scene.sound.sounds) {
      const { key, isPlaying, isPaused, willPlay } = this.scene.sound.sounds[index]
      this.soundStates[key] = { isPlaying, isPaused, willPlay }
      this.scene.sound.sounds[index].pause()
    }
  }

  enableSounds () {
    this.setFrame(0)

    for (let index in this.scene.sound.sounds) {
      let soundState = this.soundStates[this.scene.sound.sounds[index].key]
      if (soundState === undefined) {
        soundState = {
          isPlaying: this.scene.sound.sounds[index].isPlaying,
          isPaused: this.scene.sound.sounds[index].isPaused
        }
      }
      const { isPlaying, isPaused, willPlay } = soundState
      const { playOnce } = this.scene.sound.sounds[index]

      if (isPlaying) this.scene.sound.sounds[index].resume()
      else if (willPlay) this.scene.sound.sounds[index].play()
      else if (!isPaused && (playOnce === undefined || !playOnce)) this.scene.sound.sounds[index].play()
    }
  }
}

export default MusicButton
