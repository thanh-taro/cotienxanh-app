import sound from './sound.mp3'

class ChooseTheRightPictureGuideSound {
  static get KEY () {
    return 'ChooseTheRightPictureGuideSound'
  }

  static preload (scene) {
    scene.load.audio(ChooseTheRightPictureGuideSound.KEY, sound)
  }
}

export default ChooseTheRightPictureGuideSound
