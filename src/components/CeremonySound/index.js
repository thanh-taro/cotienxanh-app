import sound from './sound.mp3'

class CeremonySound {
  static get KEY () {
    return 'CeremonySound'
  }

  static preload (scene) {
    scene.load.audio(CeremonySound.KEY, sound)
  }
}

export default CeremonySound
