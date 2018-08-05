import sound from './sound.mp3'

class HomeAudio {
  static get KEY () {
    return 'HomeAudio'
  }

  static preload (scene) {
    scene.load.audio(HomeAudio.KEY, sound)
  }

  static make(scene, config = {}) {
    return scene.sound.add(HomeAudio.KEY, config)
  }
}

export default HomeAudio
