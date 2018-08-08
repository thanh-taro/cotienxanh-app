import sound from './sound.mp3'

class BackgroundAudio {
  static get KEY () {
    return 'BackgroundAudio'
  }

  static preload (scene) {
    scene.load.audio(BackgroundAudio.KEY, sound)
  }
}

export default BackgroundAudio
