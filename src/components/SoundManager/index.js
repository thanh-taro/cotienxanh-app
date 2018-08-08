import Setting from '../Setting'
import LogoAudio from '../LogoAudio'
import WelcomeAudio from '../WelcomeAudio'
import BackgroundAudio from '../BackgroundAudio'

class SoundManager {
  static preload (scene) {
    LogoAudio.preload(scene)
    WelcomeAudio.preload(scene)
    BackgroundAudio.preload(scene)
  }

  static play (scene, key, config = {}) {
    let sound = scene.sound.add(key, config)
    if (config.playOnce) sound.playOnce = config.playOnce

    const enabledToPlay = Setting.MUSIC_ENABLED

    for (let index in scene.sound.sounds) {
      if (scene.sound.sounds[index].key !== key) continue

      if (enabledToPlay) scene.sound.sounds[index].play()
      else scene.sound.sounds[index].willPlay = true
    }
  }

  static stop (scene, key) {
    for (let index in scene.sound.sounds) {
      if (scene.sound.sounds[index].key !== key) continue

      scene.sound.sounds[index].stop()
    }
  }

  static pause (scene, key) {
    for (let index in scene.sound.sounds) {
      if (scene.sound.sounds[index].key !== key) continue

      scene.sound.sounds[index].pause()
    }
  }
}

export default SoundManager
