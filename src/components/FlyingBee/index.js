import Phaser from 'phaser'
import bee from './bee.png'

class FlyingBee extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'FlyingBee'
  }

  static preload (scene) {
    scene.load.spritesheet(FlyingBee.KEY, bee, { frameWidth: 97, frameHeight: 86 })
  }

  constructor (scene, x, y, addToScene = true, config = {}) {
    super(scene, x, y, FlyingBee.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })

    const scale = scene.cameras.main.height / 720
    this.setScale(scale)
    this.setSize(this.displayWidth, this.displayHeight)

    this.createAnimations()

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
    scene.updates.add(this)
    scene.children.bringToTop(this)

    this.setInteractive()
    this.on('pointerdown', this.onPointerDown, this)
    this.play('bee-fly')

    this.fly()
  }

  fly () {
    const hide = Math.floor(Math.random() * 10) === 0

    const newX = Math.floor(Math.random() * (this.scene.cameras.main.width - this.displayWidth * 2)) + this.displayWidth / 2
    const newY = Math.floor(Math.random() * (this.scene.cameras.main.height - this.displayHeight * 2)) + this.displayHeight / 2
    const direction = newX < this.x ? 'left' : 'right'

    if (direction === 'left') this.flipX = -1
    else this.flipX = 0

    this.scene.tweens.add({
      targets: this,
      x: newX,
      y: newY,
      alpha: hide ? 0 : 1,
      duration: 500
    })
  }

  update (time, delta, data) {
    const oldTime = this.oldTime || 0
    if (time - oldTime >= 3000) {
      this.oldTime = time
      this.fly()
    }
  }

  onPointerDown (pointer, x, y, event) {
    this.fly()
  }

  createAnimations () {
    if (this.scene.anims.get('bee-fly') === undefined) {
      this.scene.anims.create({
        key: 'bee-fly',
        frames: this.scene.anims.generateFrameNumbers(FlyingBee.KEY, { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
      })
    }
  }
}

export default FlyingBee
