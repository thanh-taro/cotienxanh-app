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
    this.things.backgroundImage = new HomeBackgroundImage(this, 0, 0)
    this.things.gameOneBloonImage = new GameOneBloonImage(this)
    this.things.gameTwoBloonImage = new GameTwoBloonImage(this)
    this.things.gameThreeBloonImage = new GameThreeBloonImage(this)
    this.things.gameFourBloonImage = new GameFourBloonImage(this)
    this.things.musicButton = new MusicButton(this, this.onMusicSettingChange.bind(this))
    this.things.homeAudio = HomeAudio.make(this, { loop: true })
    this.things.welcomeAudio = WelcomeAudio.make(this)

    if (this.musicEnabled()) {
      this.things.homeAudio.play()
      this.things.welcomeAudio.play()
      this.things.welcomeAudioAlreadyPlay = true
    }
  }

  update () {
    for (let index in this.things) {
      const thing = this.things[index]
      if (thing.update) thing.update()
    }
  }

  musicEnabled () {
    return Setting.MUSIC_ENABLED
  }

  onMusicSettingChange (enabled) {
    if (enabled) {
      if (this.things.homeAudio.isPaused) this.things.homeAudio.resume()
      else this.things.homeAudio.play()

      if (this.things.welcomeAudioAlreadyPlay === undefined) {
        if (this.things.welcomeAudio.isPaused) this.things.welcomeAudio.resume()
        else this.things.welcomeAudio.play()
      }
    } else {
      if (this.things.homeAudio.isPlaying) this.things.homeAudio.pause()
      if (this.things.welcomeAudio.isPlaying) this.things.welcomeAudio.pause()
    }
  }
}

export default HomeScene
