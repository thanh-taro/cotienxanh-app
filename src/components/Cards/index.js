import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class Cards extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'Cards'
  }

  static get ASSETSPEC () {
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

  constructor (scene, key, number, data, cb, addToScene = true, config = {}, clickCB) {
    let x = data.x
    let y = data.y
    let scale = data.scale
    super(scene, x, y, Cards.KEY + '-' + key, 0)

    const cardKey = key.length == 1 ? key : key.substring(0, key.length-1)
    this.indexKey = number
    this.cardKey = cardKey
    this.cb = cb
    this.allowClick = true
    this.sound = scene.sound.add(Cards.KEY + '-' + cardKey.toLowerCase() + '-sound')
    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setScrollFactor(0)
    this.setInteractive()
    this.setScale(scale)
    this.on('pointerdown', clickCB, this)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  flipIn () {
    this.open = false
    this.scene.time.delayedCall(2000, () => {
      this.setFrame(0)
    })
  }

  flipOut () {
    this.setFrame(1)
    this.open = true
    this.sound.play()
  }
}

export default Cards
