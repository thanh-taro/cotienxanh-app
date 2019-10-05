import sound from './sound.mp3'

class WelcomeAudio {
  static get KEY () {
    return 'WelcomeAudio'
  }

  static preload (scene) {
    scene.load.audio(WelcomeAudio.KEY, sound)
  }
}

export default WelcomeAudio
