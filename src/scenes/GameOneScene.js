import Phaser from 'phaser'
import GameOneTilemap from '../components/GameOneTilemap'
import GameOnePlayer from '../components/GameOnePlayer'
import GamePadLeftButton from '../components/GamePadLeftButton'
import GamePadRightButton from '../components/GamePadRightButton'
import GamePadUpButton from '../components/GamePadUpButton'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'

class GameOneScene extends Phaser.Scene {
  static get KEY () {
    return 'GameOneScene'
  }

  constructor () {
    super({ key: GameOneScene.KEY })

    this.things = {}
  }

  create () {
    this.createTilemap()
    this.createPlayer()
    this.createPlayerInteractiveWithMap()
    this.createGameTouchPads()
    this.createGameKeyboardKeys()
    this.createBackToHomeButton()
    this.createMusicButton()
  }

  update (time, delta) {
    for (let index in this.things) if (this.things[index].update) this.things[index].update()

    if (this.things.keyLeft.isDown) this.onKeyLeftDown()
    else this.onKeyLeftUp()
    if (this.things.keyRight.isDown) this.onKeyRightDown()
    else this.onKeyRightUp()
    if (this.things.keySpace.isDown) this.onKeySpaceDown()
    else this.onKeySpaceUp()

    const onFloor = this.things.player.body.onFloor()

    if (this.things.player.isJumping && onFloor) this.things.player.stopActions()

    if (this.isMovingLeft) this.things.player.run(GameOnePlayer.DIRECTION_LEFT)
    if (this.isMovingRight) this.things.player.run(GameOnePlayer.DIRECTION_RIGHT)
    if (this.isJumping && onFloor) this.things.player.jump()

    if (!this.isMovingLeft && !this.isMovingRight && !this.isJumping && !this.things.player.isJumping) this.things.player.stopActions()
  }

  createBackToHomeButton () {
    if (this.things.homeButton !== undefined) {
      this.things.homeButton.destroy()
      this.things.homeButton = null
    }

    this.things.homeButton = new HomeButton(this)
  }

  createMusicButton () {
    if (this.things.musicButton !== undefined) {
      this.things.musicButton.destroy()
      this.things.musicButton = null
    }

    this.things.musicButton = new MusicButton(this)
    this.things.musicButton.on('settingchange', this.onMusicSettingChange.bind(this))
  }

  createTilemap () {
    if (this.things.tilemap !== undefined) {
      this.things.tilemap.destroy()
      this.things.tilemap = null
    }

    this.things.tilemap = new GameOneTilemap(this)
  }

  createPlayer () {
    if (this.things.player !== undefined) {
      this.things.player.destroy()
      this.things.player = null
    }

    this.things.player = new GameOnePlayer(this, 100, 100, this.things.tilemap.tileHeight)
  }

  createPlayerInteractiveWithMap () {
    if (this.things.tilemap === undefined || this.things.tilemap === null || this.things.player === undefined || this.things.player === null) return

    this.physics.add.collider(this.things.tilemap.platformLayer, this.things.player)
    this.physics.add.overlap(this.things.tilemap.coinLayer, this.things.player)
    this.physics.add.overlap(this.things.tilemap.questLayer, this.things.player)
  }

  createGameTouchPads () {
    if (this.things.gamePadLeftButton !== undefined) {
      this.things.gamePadLeftButton.destroy()
      this.things.gamePadLeftButton = null
    }
    if (this.things.gamePadRightButton !== undefined) {
      this.things.gamePadRightButton.destroy()
      this.things.gamePadRightButton = null
    }
    if (this.things.gamePadUpButton !== undefined) {
      this.things.gamePadUpButton.destroy()
      this.things.gamePadUpButton = null
    }

    this.things.gamePadLeftButton = new GamePadLeftButton(this)
    this.things.gamePadRightButton = new GamePadRightButton(this)
    this.things.gamePadUpButton = new GamePadUpButton(this)

    this.things.gamePadLeftButton.on('down', this.onGamePadLeftDown.bind(this))
    this.things.gamePadLeftButton.on('release', this.onGamePadLeftRelease.bind(this))
    this.things.gamePadRightButton.on('down', this.onGamePadRightDown.bind(this))
    this.things.gamePadRightButton.on('release', this.onGamePadRightRelease.bind(this))
    this.things.gamePadUpButton.on('down', this.onGamePadUpDown.bind(this))
    this.things.gamePadUpButton.on('release', this.onGamePadUpRelease.bind(this))
  }

  onMusicSettingChange (enabled) {
    if (enabled) {
      if (this.things.homeMusic.isPaused) this.things.homeMusic.resume()
      else this.things.homeMusic.play()
    } else if (this.things.homeMusic.isPlaying) this.things.homeMusic.pause()
  }

  createGameKeyboardKeys () {
    if (this.things.keyLeft === undefined) this.things.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    if (this.things.keyRight === undefined) this.things.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    if (this.things.keySpace === undefined) this.things.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  onGamePadLeftDown () {
    this.touching = true
    this.isMovingLeft = true
  }

  onGamePadLeftRelease () {
    this.touching = false
    this.isMovingLeft = false
  }

  onGamePadRightDown () {
    this.touching = true
    this.isMovingRight = true
  }

  onGamePadRightRelease () {
    this.touching = false
    this.isMovingRight = false
  }

  onGamePadUpDown () {
    this.touching = true
    this.isJumping = true
  }

  onGamePadUpRelease () {
    this.touching = false
    this.isJumping = false
  }

  onKeyLeftDown () {
    this.touching = false
    this.isMovingLeft = true
  }

  onKeyLeftUp () {
    this.touching = false
    this.isMovingLeft = false
  }

  onKeyRightDown () {
    this.touching = false
    this.isMovingRight = true
  }

  onKeyRightUp () {
    this.touching = false
    this.isMovingRight = false
  }

  onKeySpaceDown () {
    this.touching = false
    this.isJumping = true
  }

  onKeySpaceUp () {
    this.touching = false
    this.isJumping = false
  }
}

export default GameOneScene
