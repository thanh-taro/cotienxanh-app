import sound from './sound.mp3'

class CollectCoinAudio {
  static get KEY () {
    return 'CollectCoinAudio'
  }

  static preload (scene) {
    scene.load.audio(CollectCoinAudio.KEY, sound)
  }
}

export default CollectCoinAudio
