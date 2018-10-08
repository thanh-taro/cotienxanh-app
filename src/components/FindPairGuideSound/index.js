import sound from './sound.mp3'

class FindPairGuideSound {
  static get KEY () {
    return 'FindPairGuideSound'
  }

  static preload (scene) {
    scene.load.audio(FindPairGuideSound.KEY, sound)
  }
}

export default FindPairGuideSound
