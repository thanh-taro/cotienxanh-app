import Phaser from 'phaser'
import { loadAsset, removeTimbre } from '../../helpers'
import assetSpec from './asset-spec'

class Cards extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'Cards'
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
      scene.load.spritesheet(Cards.KEY + '-' + key, asset, { frameWidth: assetWidth, frameHeight: assetHeight })
    }

    for (let index in soundCollection) {
      let { asset, key } = soundCollection[index]
      scene.load.audio(Cards.KEY + '-' + key + '-sound', asset)
    }
  }

  constructor (scene, key, number, data, cb, addToScene = true, config = {}, clickCallBack) {
    let x = data.x
    let y = data.y
    let scale = data.scale
    super(scene, x, y, Cards.KEY + '-' + key, 0)
    const cardKey = key.length === 1 ? key : key.substring(0, key.length - 1)
    this.indexKey = number
    this.cardKey = cardKey
    this.cb = cb
    this.currentFrame = 0
    this.allowClick = data.allowClick !== 'undefined' ? data.allowClick : true
    let hasSound = typeof data.hasSound !== 'undefined' ? data.hasSound : true
    if (hasSound) this.sound = scene.sound.add(Cards.KEY + '-' + removeTimbre(cardKey.toLowerCase()) + '-sound')
    if (data.isOpen) this.flipOut(false)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setScrollFactor(0)
    this.setInteractive()
    this.setScale(scale)
    if (data.origin) this.setOrigin(data.origin.x, data.origin.y)
    if (clickCallBack) this.on('pointerdown', clickCallBack, this)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  flipIn () {
    this.open = false
    this.setFrame(0)
    this.currentFrame = 0
  }

  flipOut (playSound = true) {
    this.setFrame(1)
    this.currentFrame = 1
    this.open = true
    if (playSound) this.sound.play()
  }

  makeWhite (playSound = true) {
    this.setFrame(2)
    this.currentFrame = 2
    if (playSound) this.sound.play()
  }
}

export default Cards
