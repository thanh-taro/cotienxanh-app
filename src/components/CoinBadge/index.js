import CoinImage from './CoinImage'
import CoinText from './CoinText'
import User from '../User'

class CoinBadge {
  static preload (scene) {
    CoinImage.preload(scene)
  }

  constructor (scene, addToScene = true, config = {}) {
    this.coinImage = new CoinImage(scene, addToScene, config)
    this.coinText = new CoinText(scene, addToScene, config)
    this.coinText.x = this.coinImage.x + this.coinImage.displayWidth + 8
    this.coinText.y = this.coinImage.y
    this.coinText.setFontSize(this.coinImage.displayHeight)
  }

  addCoin (coin = 1) {
    this.coinText.coin += coin
    this.coinText.updateCoin()
    User.setCoin(this.coinText.coin)
  }
}

export default CoinBadge
