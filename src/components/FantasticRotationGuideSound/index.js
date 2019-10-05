import sound from './sound.mp3'

class FantasticRotationGuideSound {
  static get KEY () {
    return 'FantasticRotationGuideSound'
  }

  static preload (scene) {
    scene.load.audio(FantasticRotationGuideSound.KEY, sound)
  }
}

export default FantasticRotationGuideSound
