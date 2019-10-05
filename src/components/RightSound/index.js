import sound from './sound.mp3'

class RightSound {
  static get KEY () {
    return 'RightSound'
  }

  static preload (scene) {
    scene.load.audio(RightSound.KEY, sound)
  }
}

export default RightSound
