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
    this.coinText.setFontSize(this.coinImage.displayHeight / 1.3)
  }

  addCoin (coin = 1, force = false) {
    if (undefined === this.oldCoin) {
      this.oldCoin = parseInt(this.coinText.coin)
    }

    this.coinText.coin += parseInt(coin)
    this.coinText.updateCoin()

    if (force || this.oldCoin + 10 <= this.coinText.coin) {
      this.oldCoin = this.coinText.coin
      User.setCoin(this.coinText.coin)
    }
  }
}

export default CoinBadge
