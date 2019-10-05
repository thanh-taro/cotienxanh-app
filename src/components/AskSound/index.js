import sound from './sound.mp3'

class AskSound {
  static get KEY () {
    return 'AskSound'
  }

  static preload (scene) {
    scene.load.audio(AskSound.KEY, sound)
  }
}

export default AskSound
