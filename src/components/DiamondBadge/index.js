import DiamondImage from './DiamondImage'
import DiamondText from './DiamondText'
import User from '../User'

class DiamondBadge {
  static preload (scene) {
    DiamondImage.preload(scene)
  }

  constructor (scene, addToScene = true, config = {}) {
    this.diamondImage = new DiamondImage(scene, addToScene, config)
    this.diamondText = new DiamondText(scene, addToScene, config)
    this.diamondText.x = this.diamondImage.x + this.diamondImage.displayWidth + 8
    this.diamondText.y = this.diamondImage.y
    this.diamondText.setFontSize(this.diamondImage.displayHeight / 1.3)
  }

  addDiamond (diamond = 1, force = false) {
    if (undefined === this.oldDiamond) {
      this.oldDiamond = parseInt(this.diamondText.diamond)
    }

    this.diamondText.diamond += parseInt(diamond)
    this.diamondText.updateDiamond()

    if (force || this.oldDiamond + 1 <= this.diamondText.diamond) {
      this.oldDiamond = this.diamondText.diamond
      User.setDiamond(this.diamondText.diamond)
    }
  }
}

export default DiamondBadge
