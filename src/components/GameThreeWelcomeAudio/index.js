import sound from './sound.mp3'

class GameThreeWelcomeAudio {
  static get KEY () {
    return 'GameThreeWelcomeAudio'
  }

  static preload (scene) {
    scene.load.audio(GameThreeWelcomeAudio.KEY, sound)
  }
}

export default GameThreeWelcomeAudio
