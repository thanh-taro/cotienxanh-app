import sound from './sound.mp3'

class HitQuestSound {
  static get KEY () {
    return 'HitQuestSound'
  }

  static preload (scene) {
    scene.load.audio(HitQuestSound.KEY, sound)
  }
}

export default HitQuestSound
