import sound from './sound.mp3'

class FindCharactersGuideSound {
  static get KEY () {
    return 'FindCharactersGuideSound'
  }

  static preload (scene) {
    scene.load.audio(FindCharactersGuideSound.KEY, sound)
  }
}

export default FindCharactersGuideSound
