import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'
import User from '../User'

const { avatar } = User.currentUser()
assetSpec.asset = avatar

class UserAvatar extends Phaser.GameObjects.Image {
  static get KEY () {
    return 'UserAvatar'
  }

  static preload (scene) {
    const { asset } = loadAsset(scene, assetSpec)
    scene.load.image(UserAvatar.KEY, asset)
  }

  constructor (scene, addToScene = true, config = {}) {
    const { scale } = loadAsset(scene, assetSpec)
    const x = 8
    const y = 8

    super(scene, x, y, UserAvatar.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0)
    this.setScrollFactor(0)
    this.setScale(scale)

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }
}

export default UserAvatar
