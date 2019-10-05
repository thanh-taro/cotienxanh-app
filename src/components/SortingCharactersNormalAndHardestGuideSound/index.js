import sound from './sound.mp3'

class SortingCharactersGuideSound {
  static get KEY () {
    return 'SortingCharactersGuideSound'
  }

  static preload (scene) {
    scene.load.audio(SortingCharactersGuideSound.KEY, sound)
  }
}

export default SortingCharactersGuideSound
