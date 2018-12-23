import ClockImage from './ClockImage'
import ClockText from './ClockText'

class ClockBadge {
  static preload (scene) {
    ClockImage.preload(scene)
  }

  constructor (scene, addToScene = true, config = {}) {
    this.clockImage = new ClockImage(scene, addToScene, config)
    this.clockText = new ClockText(scene, addToScene, config)
    this.clockText.x = this.clockImage.x + this.clockImage.displayWidth + 8
    this.clockText.y = this.clockImage.y
    this.clockText.setFontSize(this.clockImage.displayHeight / 1.3)
  }
}

export default ClockBadge
