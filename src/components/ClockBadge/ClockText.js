import Phaser from 'phaser'
import { allowedTime } from '../../config'
import { checkPlayTime } from '../../helpers'

class ClockText extends Phaser.GameObjects.Text {
  constructor (scene, addToScene = true, config = {}) {
    const x = 608
    const y = 48

    super(scene, x, y, 0)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0.5)
    this.setScrollFactor(0)
    this.setAlign('left')
    this.setFontFamily('Quicksand, monospace')
    this.setFontStyle('bold')
    this.setColor('#FFF9C4')
    this.setShadow(1, 1, '#000000')
    this.setText('00:00')
    this.durationTime = 0

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
    scene.updates.add(this)
  }

  update () {
    const diff = Math.floor(Math.abs(Date.now() - window.startTime) / 1000)
    if (diff > this.durationTime) {
      this.durationTime = diff

      let minus = Math.floor(diff / 60)
      let second = Math.floor(diff % 60)
      if (minus < 10) minus = '0' + minus
      if (second < 10) second = '0' + second
      this.setText('' + minus + ':' + second)

      if (diff < allowedTime / 3) this.setColor('#FFF9C4')
      else if (diff < allowedTime / 3 * 2) this.setColor('#FFEB3B')
      else this.setColor('#D32F2F')
    }

    checkPlayTime(this.scene.scene)
  }
}

export default ClockText
