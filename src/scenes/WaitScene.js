import Phaser from 'phaser'
import CheckUserScene from './CheckUserScene'
import store from 'store'
import { destroyObject, addBee } from '../helpers'

class WaitScene extends Phaser.Scene {
  static get KEY () {
    return 'WaitScene'
  }

  constructor () {
    super({ key: WaitScene.KEY })

    this.things = {}
  }

  create (data) {
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    this.things.data = data

    this.make.text({
      x: centerX,
      y: centerY - 40,
      text: 'Bạn đã chơi quá giờ quy định. Vui lòng đợi trong',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)

    let waitText = this.make.text({
      x: centerX,
      y: centerY + 20,
      text: '00:00',
      style: {
        font: '48px monospace',
        fill: '#ffffff'
      }
    })
    waitText.setOrigin(0.5, 0.5)

    this.things.waitText = waitText
    this.things.remainTime = 0

    addBee(this)
  }

  update () {
    const duration = (Date.now() - this.things.data.startTime) / 1000
    const remainTime = this.things.data.waitTime + this.things.data.allowedTime - duration + 1
    if (remainTime < 0) {
      destroyObject(this.things.remainTime)

      const startTime = Date.now()
      store.set('startTime', startTime)
      window.startTime = startTime
      this.scene.start(CheckUserScene.KEY)
    } else if (remainTime !== this.things.remainTime) {
      let minus = Math.floor(remainTime / 60)
      let second = Math.floor(remainTime % 60)
      if (minus < 10) minus = '0' + minus
      if (second < 10) second = '0' + second
      this.things.waitText.setText('' + minus + ':' + second)

      this.things.remainTime = remainTime
    }
  }
}

export default WaitScene
