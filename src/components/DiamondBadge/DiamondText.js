import Phaser from 'phaser'
import User from '../User'

class DiamondText extends Phaser.GameObjects.Text {
  constructor (scene, addToScene = true, config = {}) {
    const x = 608
    const y = 48
    const { diamond } = User.currentUser()

    super(scene, x, y, diamond)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0.5)
    this.setScrollFactor(0)
    this.setAlign('left')
    this.setFontFamily('Quicksand, monospace')
    this.setFontStyle('bold')
    this.setColor('#4FC3F7')
    this.setShadow(1, 1, '#000000')
    this.diamond = diamond

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  updateDiamond () {
    this.setText(this.diamond)
  }
}

export default DiamondText
