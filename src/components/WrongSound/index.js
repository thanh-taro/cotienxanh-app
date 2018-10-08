import sound from './sound.mp3'

class WrongSound {
  static get KEY () {
    return 'WrongSound'
  }

  static preload (scene) {
    scene.load.audio(WrongSound.KEY, sound)
  }
}

export default WrongSound
