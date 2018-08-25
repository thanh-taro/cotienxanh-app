import Phaser from 'phaser'
import JumpAudio from '../JumpAudio'
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
    scene.load.spritesheet(GameOnePlayer.KEY, player, { frameWidth: 110, frameHeight: 128 })
  }

  constructor (scene, x, y, scaleHeight, addToScene = true, config = {}) {
    super(scene, x, y, GameOnePlayer.KEY)

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    const scaleWidth = this.width * scaleHeight / this.height
    this.setDisplaySize(scaleWidth, scaleHeight)
    this.setSize(scaleWidth, scaleHeight)
    this.createAnimations()
    this.isRunning = false
    this.isJumping = false
    if (scaleHeight === 32) {
      this.gravityY = 100
      this.velocityY = 300
      this.velocityX = 100
    } else if (scaleHeight === 64) {
      this.gravityY = 200
      this.velocityY = 420
      this.velocityX = 200
    } else if (scaleHeight === 96) {
      this.gravityY = 300
      this.velocityY = 600
      this.velocityX = 300
    } else {
      this.gravityY = 400
      this.velocityY = 800
      this.velocityX = 400
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
    this.body.setGravityY(this.gravityY)

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

    if (direction === GameOnePlayer.DIRECTION_LEFT) this.body.setVelocityX(-this.velocityX)
    else if (direction === GameOnePlayer.DIRECTION_RIGHT) this.body.setVelocityX(this.velocityX)
  }

  jump () {
    this.scene.sound.play(JumpAudio.KEY, { volume: 0.1 })

    if (!this.isJumping) {
      this.isJumping = true
      this.play(GameOnePlayer.JUMP_KEY)
    }

    this.body.setVelocityY(-this.velocityY)
  }

  stopActions () {
    if (this.isJumping || this.isRunning) this.play(GameOnePlayer.IDLE_KEY)

    this.isJumping = false
    this.isRunning = false
  }

  reset () {
    this.body.setVelocityX(0)
  }

  createAnimations () {
    if (this.scene.anims.get(GameOnePlayer.IDLE_KEY) === undefined) {
      this.scene.anims.create({
        key: GameOnePlayer.IDLE_KEY,
        frames: this.scene.anims.generateFrameNumbers(GameOnePlayer.KEY, { start: 0, end: 15 }),
        frameRate: 30,
        repeat: -1
      })
    }
    if (this.scene.anims.get(GameOnePlayer.RUN_KEY) === undefined) {
      this.scene.anims.create({
        key: GameOnePlayer.RUN_KEY,
        frames: this.scene.anims.generateFrameNumbers(GameOnePlayer.KEY, { start: 46, end: 65 }),
        frameRate: 30,
        repeat: -1
      })
    }
    if (this.scene.anims.get(GameOnePlayer.JUMP_KEY) === undefined) {
      this.scene.anims.create({
        key: GameOnePlayer.JUMP_KEY,
        frames: this.scene.anims.generateFrameNumbers(GameOnePlayer.KEY, { start: 16, end: 45 }),
        frameRate: 30,
        repeat: -1
      })
    }
  }
}

export default GameOnePlayer
