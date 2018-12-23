import sound from './sound.mp3'

class GameTwoWelcomeAudio {
  static get KEY () {
    return 'GameTwoWelcomeAudio'
  }

  static preload (scene) {
    scene.load.audio(GameTwoWelcomeAudio.KEY, sound)
  }
}

export default GameTwoWelcomeAudio
