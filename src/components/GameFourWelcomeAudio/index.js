import sound from './sound.mp3'

class GameFourWelcomeAudio {
  static get KEY () {
    return 'GameFourWelcomeAudio'
  }

  static preload (scene) {
    scene.load.audio(GameFourWelcomeAudio.KEY, sound)
  }
}

export default GameFourWelcomeAudio
