import sound from './sound.mp3'

class FormingAStoryGuideSound {
  static get KEY () {
    return 'FormingAStoryGuideSound'
  }

  static preload (scene) {
    scene.load.audio(FormingAStoryGuideSound.KEY, sound)
  }
}

export default FormingAStoryGuideSound
