import Phaser from 'phaser'
import User from '../User'

class CoinText extends Phaser.GameObjects.Text {
  constructor (scene, addToScene = true, config = {}) {
    const x = 8
    const y = 48
    const { coin } = User.currentUser()

    super(scene, x, y, coin)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0.5)
    this.setScrollFactor(0)
    this.setAlign('left')
    this.setFontFamily('Quicksand, monospace')
    this.setFontStyle('bold')
    this.setColor('#FFEB3B')
    this.setShadow(1, 1, '#000000')

    this.coin = coin

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  updateCoin () {
    this.setText(this.coin)
  }
}

export default CoinText
