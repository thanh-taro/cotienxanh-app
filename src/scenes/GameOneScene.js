import Phaser from 'phaser'
import GameOneWelcomeAudio from '../components/GameOneWelcomeAudio'
import GameOneBackgroundAudio from '../components/GameOneBackgroundAudio'
import GameOneTilemap from '../components/GameOneTilemap'
import GameOnePlayer from '../components/GameOnePlayer'
import GamePadLeftButton from '../components/GamePadLeftButton'
import GamePadRightButton from '../components/GamePadRightButton'
import GamePadUpButton from '../components/GamePadUpButton'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'
import CollectCoinAudio from '../components/CollectCoinAudio'
import HitQuestSound from '../components/HitQuestSound'
import CoinBadge from '../components/CoinBadge'
import FindPairScene from '../scenes/FindPairScene'
import { isTouchableDevice, destroyObject } from '../helpers'
import CeremonySound from '../components/CeremonySound'

class GameOneScene extends Phaser.Scene {
  static get KEY () {
    return 'GameOneScene'
  }

  constructor () {
    super({ key: GameOneScene.KEY })

    this.things = {}
  }

  create (data) {
    if (data) {
      const { forceRestart } = data
      if (forceRestart) this.forceRestart()
      delete this.scene.settings.data
    }

    this.playWelcomeAudio()
    // this.playBackgroundMusic()
    this.createTilemap()
    this.createPlayer(this.things.tilemap.playerStartX, this.things.tilemap.playerStartY, this.things.tilemap.playerHeight)
    this.createPlayerInteractiveWithMap()
    if (isTouchableDevice()) this.createGameTouchPads()
    this.createGameKeyboardKeys()
    this.createCoinBadge()
    this.createBackToHomeButton()
    this.createMusicButton()

    this.things.isMovingLeft = false
    this.things.isMovingRight = false
    this.things.isJumping = false
    this.things.touching = false

    this.events.on('resume', this.onResume.bind(this))
  }

  update (time, delta, data) {
    const { isMovingLeft, isMovingRight, isJumping, touching, keyLeft, keyRight, keySpace, player } = this.things

    player.reset()

    if (keyLeft && keyLeft.isDown) this.onKeyLeftDown()
    else if (keyLeft && keyLeft.isUp && !touching) this.onKeyLeftUp()
    if (keyRight && keyRight.isDown) this.onKeyRightDown()
    else if (keyRight && keyRight.isUp && !touching) this.onKeyRightUp()
    if (keySpace && keySpace.isDown) this.onKeySpaceDown()
    else if (keySpace && keySpace.isUp && !touching) this.onKeySpaceUp()

    const onFloor = this.things.player.body.onFloor()

    if (player.isJumping && onFloor) player.stopActions()
    if (isJumping && onFloor) player.jump()
    if (isMovingLeft) player.run(GameOnePlayer.DIRECTION_LEFT)
    if (isMovingRight) player.run(GameOnePlayer.DIRECTION_RIGHT)

    if (!isMovingLeft && !isMovingRight && !isJumping && !player.isJumping) player.stopActions()
  }

  onResume (scene, data) {
    if (undefined !== data && undefined !== data.from) {
      this.resetPlayer()

      this.playCeremonyAudio()
      this.things.coinBadge.addCoin(data.coin, true)
    }
  }

  forceRestart () {
    for (let index in this.things) {
      destroyObject(this.things[index])
      delete this.things[index]
    }
  }

  createCoinBadge () {
    if (this.things.coinBadge === undefined) this.things.coinBadge = new CoinBadge(this)
  }

  createBackToHomeButton () {
    if (this.things.homeButton === undefined) {
      const y = this.things.coinBadge.coinImage.y + this.things.coinBadge.coinImage.displayHeight / 2 + 8
      this.things.homeButton = new HomeButton(this, y)

      // force to update coin to server
      this.things.homeButton.setCallback(() => {
        this.things.coinBadge.addCoin(0, true)
      })
    }
  }

  createMusicButton () {
    if (this.things.musicButton === undefined) this.things.musicButton = new MusicButton(this)
  }

  createTilemap () {
    if (this.things.tilemap === undefined) this.things.tilemap = new GameOneTilemap(this)
  }

  createPlayer (playerStartX, playerStartY, scaleHeight) {
    if (this.things.player === undefined) this.things.player = new GameOnePlayer(this, playerStartX, playerStartY, scaleHeight)
  }

  createPlayerInteractiveWithMap () {
    if (this.things.tilemap === undefined || this.things.tilemap === null || this.things.player === undefined || this.things.player === null) return

    if (this.things.alreadyPlayInteractive === undefined) {
      this.physics.add.collider(this.things.tilemap.platformLayer, this.things.player)
      this.physics.add.overlap(this.things.tilemap.coinLayer, this.things.player)
      this.physics.add.overlap(this.things.tilemap.questLayer, this.things.player)
      this.things.tilemap.coinLayer.setTileIndexCallback(18, this.onHitCoin, this)
      this.things.tilemap.questLayer.setTileIndexCallback(27, this.onHitQuest, this)
      this.things.alreadyPlayInteractive = true
    }
  }

  createGameTouchPads () {
    if (this.things.gamePadLeftButton === undefined) {
      this.things.gamePadLeftButton = new GamePadLeftButton(this)
      this.things.gamePadLeftButton.on('down', this.onGamePadLeftDown.bind(this))
      this.things.gamePadLeftButton.on('release', this.onGamePadLeftRelease.bind(this))
    }
    if (this.things.gamePadRightButton === undefined) {
      this.things.gamePadRightButton = new GamePadRightButton(this)
      this.things.gamePadRightButton.on('down', this.onGamePadRightDown.bind(this))
      this.things.gamePadRightButton.on('release', this.onGamePadRightRelease.bind(this))
    }
    if (this.things.gamePadUpButton === undefined) {
      this.things.gamePadUpButton = new GamePadUpButton(this)
      this.things.gamePadUpButton.on('down', this.onGamePadUpDown.bind(this))
      this.things.gamePadUpButton.on('release', this.onGamePadUpRelease.bind(this))
    }
  }

  createGameKeyboardKeys () {
    if (this.things.keyLeft === undefined) this.things.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    if (this.things.keyRight === undefined) this.things.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    if (this.things.keySpace === undefined) this.things.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.things.keyLeft.reset()
    this.things.keyRight.reset()
    this.things.keySpace.reset()
  }

  playWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = this.sound.add(GameOneWelcomeAudio.KEY)
    this.things.welcomeAudio.play()
  }

  playBackgroundMusic () {
    this.sound.play(GameOneBackgroundAudio.KEY, { loop: true, volume: 1 })
  }

  stopWelcomeAudio () {
    this.things.welcomeAudio.stop()
  }

  playHitCoinAudio () {
    if (this.things.hitCoinAudio === undefined) this.things.hitCoinAudio = this.sound.add(CollectCoinAudio.KEY)
    this.things.hitCoinAudio.play({ volume: 0.1 })
  }

  playHitQuestAudio () {
    if (this.things.hitQuestAudio === undefined) this.things.hitQuestAudio = this.sound.add(HitQuestSound.KEY)
    this.things.hitQuestAudio.play({ volume: 0.4 })
  }

  playCeremonyAudio () {
    if (this.things.ceremonyAudio === undefined) this.things.ceremonyAudio = this.sound.add(CeremonySound.KEY)
    this.things.ceremonyAudio.play({ volume: 0.4 })
  }

  onHitCoin (sprite, tile) {
    this.playHitCoinAudio()

    this.things.coinBadge.addCoin(1)
    this.things.tilemap.coinLayer.removeTileAt(tile.x, tile.y)
  }

  onHitQuest (sprite, tile) {
    this.playHitQuestAudio()

    this.things.tilemap.questLayer.removeTileAt(tile.x, tile.y)
    this.playFindPair()
  }

  onGamePadLeftDown () {
    this.things.touching = true
    this.things.isMovingLeft = true
    this.things.isMovingRight = false
  }

  onGamePadLeftRelease () {
    this.things.isMovingLeft = false
  }

  onGamePadRightDown () {
    this.things.touching = true
    this.things.isMovingRight = true
    this.things.isMovingLeft = false
  }

  onGamePadRightRelease () {
    this.things.isMovingRight = false
  }

  onGamePadUpDown () {
    this.things.touching = true
    this.things.isJumping = true
  }

  onGamePadUpRelease () {
    this.things.isJumping = false
  }

  onKeyLeftDown () {
    this.things.touching = false
    this.things.isMovingLeft = true
    this.things.isMovingRight = false
  }

  onKeyLeftUp () {
    this.things.touching = false
    this.things.isMovingLeft = false
  }

  onKeyRightDown () {
    this.things.touching = false
    this.things.isMovingRight = true
    this.things.isMovingLeft = false
  }

  onKeyRightUp () {
    this.things.touching = false
    this.things.isMovingRight = false
  }

  onKeySpaceDown () {
    this.things.touching = false
    this.things.isJumping = true
  }

  onKeySpaceUp () {
    this.things.touching = false
    this.things.isJumping = false
  }

  resetPlayer () {
    this.things.keyLeft.reset()
    this.things.keyRight.reset()
    this.things.keySpace.reset()

    if (this.things.gamePadLeftButton !== undefined) this.things.gamePadLeftButton.reset()
    if (this.things.gamePadRightButton !== undefined) this.things.gamePadRightButton.reset()
    if (this.things.gamePadUpButton !== undefined) this.things.gamePadUpButton.reset()

    this.things.isMovingLeft = false
    this.things.isMovingRight = false
    this.things.isJumping = false
    this.things.touching = false

    this.things.player.reset()
  }

  playFindPair () {
    if (this.things.playFindPairTimes === undefined) this.things.playFindPairTimes = 1
    else this.things.playFindPairTimes++

    this.resetPlayer()
    this.stopWelcomeAudio()
    this.scene.pause()
    this.scene.run(FindPairScene.KEY, { noGuide: this.things.playFindPairTimes > 1 })
  }
}

export default GameOneScene
