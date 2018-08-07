import Phaser from 'phaser'
import player from './player.png'

class GameOnePlayer extends Phaser.GameObjects.Sprite {
  static get KEY () {
    return 'GameOnePlayer'
  }

  static get IDLE_KEY () {
    return GameOnePlayer.KEY + '-idle'
  }

  static get RUN_KEY () {
    return GameOnePlayer.KEY + '-run'
  }

  static get JUMP_KEY () {
    return GameOnePlayer.KEY + '-jump'
  }

  static get DIRECTION_LEFT () {
    return 'left'
  }

  static get DIRECTION_RIGHT () {
    return 'right'
  }

  static preload (scene) {
    scene.load.spritesheet(GameOnePlayer.KEY, player, { frameWidth: 176, frameHeight: 192 })
  }

  constructor (scene, x, y, scaleHeight, addToScene = true, config = {}) {
    super(scene, x, y, GameOnePlayer.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    const scaleWidth = this.width * scaleHeight / this.height
    this.setDisplaySize(scaleWidth, scaleHeight)
    this.setSize(scaleWidth, scaleHeight)
    this.isRunning = false
    this.isJumping = false

    if (scene.anims.get(GameOnePlayer.IDLE_KEY) === undefined) {
      scene.anims.create({
        key: GameOnePlayer.IDLE_KEY,
        frames: scene.anims.generateFrameNumbers(GameOnePlayer.KEY, { start: 0, end: 15 }),
        frameRate: 30,
        repeat: -1
      })
    }
    if (scene.anims.get(GameOnePlayer.RUN_KEY) === undefined) {
      scene.anims.create({
        key: GameOnePlayer.RUN_KEY,
        frames: scene.anims.generateFrameNumbers(GameOnePlayer.KEY, { start: 60, end: 79 }),
        frameRate: 30,
        repeat: -1
      })
    }
    if (scene.anims.get(GameOnePlayer.JUMP_KEY) === undefined) {
      scene.anims.create({
        key: GameOnePlayer.JUMP_KEY,
        frames: scene.anims.generateFrameNumbers(GameOnePlayer.KEY, { start: 30, end: 59 }),
        frameRate: 30,
        repeat: -1
      })
    }

    if (addToScene) this.addToScene(scene)
  }

  update () {
    this.reset()
  }

  addToScene (scene) {
    scene.physics.add.existing(this)
    scene.cameras.main.startFollow(this)
    this.body.setCollideWorldBounds(true)
    this.body.setGravityY(300)

    this.play(GameOnePlayer.IDLE_KEY)
  }

  changeDirection (direction) {
    const oldDirection = this.direction

    if (oldDirection === direction) return
    else if (direction === GameOnePlayer.DIRECTION_LEFT) this.flipX = -1
    else if (direction === GameOnePlayer.DIRECTION_RIGHT) this.flipX = 0

    this.direction = direction
  }

  run (direction) {
    this.changeDirection(direction)

    if (!this.isRunning) {
      this.isRunning = true
      if (!this.isJumping) this.play(GameOnePlayer.RUN_KEY)
    }

    if (direction === GameOnePlayer.DIRECTION_LEFT) this.body.setVelocityX(-250)
    else if (direction === GameOnePlayer.DIRECTION_RIGHT) this.body.setVelocityX(250)
  }

  jump () {
    if (!this.isJumping) {
      this.isJumping = true
      this.play(GameOnePlayer.JUMP_KEY)
    }

    this.body.setVelocityY(-1000)
  }

  stopActions () {
    if (this.isJumping || this.isRunning) this.play(GameOnePlayer.IDLE_KEY)

    this.isJumping = false
    this.isRunning = false
  }

  reset () {
    this.body.setVelocityX(0)
  }
}

export default GameOnePlayer
