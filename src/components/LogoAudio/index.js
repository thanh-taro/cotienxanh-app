import sound from './sound.mp3'

class LogoAudio {
  static get KEY () {
    return 'LogoAudio'
  }

  static preload (scene) {
    scene.load.audio(LogoAudio.KEY, sound)
  }
}

export default LogoAudio
