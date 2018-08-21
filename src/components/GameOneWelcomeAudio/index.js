import sound from './sound.mp3'

class GameOneWelcomeAudio {
  static get KEY () {
    return 'GameOneWelcomeAudio'
  }

  static preload (scene) {
    scene.load.audio(GameOneWelcomeAudio.KEY, sound)
  }
}

export default GameOneWelcomeAudio
