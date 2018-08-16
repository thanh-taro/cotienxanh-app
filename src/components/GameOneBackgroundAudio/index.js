import sound from './sound.mp3'

class GameOneBackgroundAudio {
  static get KEY () {
    return 'GameOneBackgroundAudio'
  }

  static preload (scene) {
    scene.load.audio(GameOneBackgroundAudio.KEY, sound)
  }
}

export default GameOneBackgroundAudio
