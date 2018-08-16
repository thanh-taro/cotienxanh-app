import sound from './sound.mp3'

class JumpAudio {
  static get KEY () {
    return 'JumpAudio'
  }

  static preload (scene) {
    scene.load.audio(JumpAudio.KEY, sound)
  }
}

export default JumpAudio
