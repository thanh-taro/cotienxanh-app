import Phaser from 'phaser'
import { loadAsset, removeTimbre } from '../../helpers'
import assetSpec from './asset-spec'

class FreeSizeCard extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'FreeSizeCard'
  }

  static get ASSET_SPEC () {
    return assetSpec
  }

  static preload (scene) {
    const { assetCollection, soundCollection } = loadAsset(scene, assetSpec)

    for (let index in assetCollection) {
      let { asset, key } = assetCollection[index]
      scene.load.image(FreeSizeCard.KEY + '-' + key, asset)
    }

    for (let index in soundCollection) {
      let { asset, key } = soundCollection[index]
      scene.load.audio(FreeSizeCard.KEY + '-' + key + '-sound', asset)
    }
  }

  constructor (scene, key, data, clickCallBack, isScaleBoth = false) {
    let {x, y, width, height} = {...data}

    super(scene, x, y, FreeSizeCard.KEY + '-' + key, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { x, y })
    this.key = key
    let scaleX = width / this.width
    let scaleY = height / this.height
    let scale = Math.min(scaleX, scaleY)
    // this.originX = 1
    // this.setScrollFactor(0)
    this.setInteractive()
    if (isScaleBoth) {
      this.setScale(scaleX, scaleY)
    } else {
      this.setScale(scale)
    }

    if (clickCallBack) this.on('pointerdown', clickCallBack, this)
    scene.add.existing(this)
  }
}

export default FreeSizeCard
