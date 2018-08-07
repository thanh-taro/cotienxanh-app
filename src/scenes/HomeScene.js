import Phaser from 'phaser'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
import MusicButton from '../components/MusicButton'
import HomeAudio from '../components/HomeAudio'
import WelcomeAudio from '../components/WelcomeAudio'
import Setting from '../components/Setting'

class HomeScene extends Phaser.Scene {
  static get KEY () {
    return 'HomeScene'
  }

  constructor () {
    super({ key: HomeScene.KEY })

    this.things = {}
  }

  create () {
    this.things.loadTimes = this.things.loadTimes === undefined ? 1 : this.things.loadTimes + 1

    this.createBackgroundMusic()
    this.createWelcomeAudio()
    this.createBackgroundImage()
    this.createGameBloons()
    this.createMusicButton()

    if (this.isMusicEnabled()) {
      if (!this.things.homeMusic.isPlaying) this.things.homeMusic.play()

      if (this.things.welcomeAudioAlreadyPlay === undefined) {
        this.things.welcomeAudio.play()
        this.things.welcomeAudioAlreadyPlay = true
      }
    }
  }

  update (time, delta) {
    for (let index in this.things) if (this.things[index].update) this.things[index].update()
  }

  createBackgroundImage () {
    if (this.things.backgroundImage !== undefined) {
      this.things.backgroundImage.destroy()
      this.things.backgroundImage = null
    }

    this.things.backgroundImage = new HomeBackgroundImage(this, 0, 0)
  }

  createGameBloons () {
    if (this.things.gameOneBloonImage !== undefined) {
      this.things.gameOneBloonImage.destroy()
      this.things.gameOneBloonImage = null
    }
    if (this.things.gameTwoBloonImage !== undefined) {
      this.things.gameTwoBloonImage.destroy()
      this.things.gameTwoBloonImage = null
    }
    if (this.things.gameThreeBloonImage !== undefined) {
      this.things.gameThreeBloonImage.destroy()
      this.things.gameThreeBloonImage = null
    }
    if (this.things.gameFourBloonImage !== undefined) {
      this.things.gameFourBloonImage.destroy()
      this.things.gameFourBloonImage = null
    }

    this.things.gameOneBloonImage = new GameOneBloonImage(this)
    this.things.gameTwoBloonImage = new GameTwoBloonImage(this)
    this.things.gameThreeBloonImage = new GameThreeBloonImage(this)
    this.things.gameFourBloonImage = new GameFourBloonImage(this)
  }

  createMusicButton () {
    if (this.things.musicButton !== undefined) {
      this.things.musicButton.destroy()
      this.things.musicButton = null
    }

    this.things.musicButton = new MusicButton(this)
    this.things.musicButton.on('settingchange', this.onMusicSettingChange.bind(this))
  }

  createBackgroundMusic () {
    if (this.things.homeMusic === undefined) this.things.homeMusic = HomeAudio.make(this, { loop: true })
  }

  createWelcomeAudio () {
    if (this.things.welcomeAudio === undefined) this.things.welcomeAudio = WelcomeAudio.make(this)
  }

  onMusicSettingChange (enabled) {
    if (enabled) {
      if (this.things.homeMusic.isPaused) this.things.homeMusic.resume()
      else this.things.homeMusic.play()

      if (this.things.welcomeAudioAlreadyPlay === undefined) {
        if (this.things.welcomeAudio.isPaused) this.things.welcomeAudio.resume()
        else this.things.welcomeAudio.play()

        this.things.welcomeAudioAlreadyPlay = true
      }
    } else {
      if (this.things.homeMusic.isPlaying) this.things.homeMusic.pause()
      if (this.things.welcomeAudio.isPlaying) this.things.welcomeAudio.pause()
    }
  }

  isMusicEnabled () {
    return Setting.MUSIC_ENABLED
  }
}

export default HomeScene
