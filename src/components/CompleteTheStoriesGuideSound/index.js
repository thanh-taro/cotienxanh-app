import sound from './sound.mp3'

class CompleteTheStoriesGuideSound {
  static get KEY () {
    return 'CompleteTheStoriesGuideSound'
  }

  static preload (scene) {
    scene.load.audio(CompleteTheStoriesGuideSound.KEY, sound)
  }
}

export default CompleteTheStoriesGuideSound
