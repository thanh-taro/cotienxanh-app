import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class Cards extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'Cards'
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

  constructor (scene, key, number, total, cb, addToScene = true, config = {}) {
    const { assetWidth, assetHeight } = loadAsset(scene, assetSpec)
    const padding = parseInt(scene.cameras.main.width * 0.01)
    const startX = 50
    const startY = 50
    const endX = scene.cameras.main.width - startX
    const endY = scene.cameras.main.height - startY
    const row = total >= 6 ? 2 : 1
    const column = total / row
    const width = (endX - startX) / column
    const height = (endY - startY) / row
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = number <= column ? parseInt((startX + padding / 2 + (number - 1) * width) + width / 2) : parseInt((startX + padding / 2 + (number - column - 1) * width) + width / 2)
    const y = number <= column ? parseInt(startY + height / 2) : parseInt(endY - height / 2)

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
    this.on('pointerdown', this.onPointerDown, this)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  onPointerDown (pointer, x, y, event) {
    if (event) event.stopPropagation()

    if (this.allowClick === false) return

    if (undefined === this.open || this.open === false) this.flipOut()
    else this.flipIn()

    if (this.open) this.cb(this)
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
