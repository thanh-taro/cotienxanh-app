import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class HorizontalCards extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'HorizontalCards'
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
      scene.load.audio(HorizontalCards.KEY + '-' + key + '-sound', asset)
    }
  }

  constructor (scene, key, number, total, type, allowClick, cb, addToScene = true, config = {}) {
    const { assetWidth, assetHeight } = loadAsset(scene, assetSpec)

    const column = type === 'question' ? 3 : total
    const padding = parseInt(scene.cameras.main.width * 0.01)
    const startX = 50
    const endX = scene.cameras.main.width - 50
    const width = type === 'question' ? scene.cameras.main.width / column : (endX - startX) / column
    const height = scene.cameras.main.height / 5
    const scaleX = (width - padding) / assetWidth
    const scaleY = (height - padding) / assetHeight

    var scale = Math.min(scaleX, scaleY)

    if (type == 'question') {
      var y = scene.cameras.main.height / 3
      var x = assetWidth * scale * (number - 1) + assetWidth * scale / 2
    } else {
      var y = scene.cameras.main.height / 3 * 2
      var x = startX + (number - 1) * width + width / 2
    }

    super(scene, x, y, HorizontalCards.KEY + '-' + key, 0)

    const cardKey = key.substring(0, key.length-1)
    this.indexKey = number
    this.cardKey = cardKey
    this.head = key[key.length -1];
    this.cb = cb
    this.allowClick = allowClick
    this.sound = scene.sound.add(HorizontalCards.KEY + '-' + cardKey.toLowerCase() + '-sound')

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setScrollFactor(0)
    this.setInteractive()
    this.setScale(scale)
    this.on('pointerdown', this.onPointerDown, this)
    if (type === 'question') this.setAlpha(0.2)
    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  onPointerDown () {
    if (this.allowClick === false) return
    this.sound.play()
    this.cb(this)
  }
}

export default HorizontalCards
