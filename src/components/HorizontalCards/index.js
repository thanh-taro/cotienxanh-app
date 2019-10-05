import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class HorizontalCards extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'HorizontalCards'
  }

  static get ASSET_SPEC () {
    return assetSpec
  }

  static preload (scene) {
    const { assetCollection, soundCollection, assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    this.assetWidth = assetWidth
    this.assetHeight = assetHeight

    for (let index in assetCollection) {
      let { asset, key } = assetCollection[index]
      scene.load.spritesheet(HorizontalCards.KEY + '-' + key, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
    }

    for (let index in soundCollection) {
      let { asset, key } = soundCollection[index]
      scene.load.audio(HorizontalCards.KEY + '-' + key.toLowerCase() + '-sound', asset)
    }
  }

  constructor (scene, key, x, y, scale, alpha, allowClick, cb, addToScene = true, config = {}, noSound = false) {
    super(scene, x, y, HorizontalCards.KEY + '-' + key, 0)

    const cardKey = key.substring(0, key.length - 1)
    this.cardKey = cardKey
    this.head = key[key.length - 1]
    this.cb = cb
    this.allowClick = allowClick
    if (!noSound) {
      this.sound = scene.sound.add(HorizontalCards.KEY + '-' + cardKey.toLowerCase() + '-sound')
    }

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setScrollFactor(0)
    this.setInteractive()
    this.setScale(scale)
    this.on('pointerdown', this.onPointerDown, this)
    this.setAlpha(alpha)
    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  onPointerDown () {
    if (this.allowClick === false) return
    if (this.sound !== undefined) {
      this.sound.play()
    }
    if (this.cb) this.cb(this)
  }
}

export default HorizontalCards
