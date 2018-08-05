import store from 'store'

class Setting {
  static get MUSIC_ENABLED_KEY () {
    return 'music.enabled'
  }

  static get MUSIC_ENABLED () {
    return store.get(Setting.MUSIC_ENABLED_KEY)
  }

  static set MUSIC_ENABLED (value) {
    return store.set(Setting.MUSIC_ENABLED_KEY, value)
  }
}

export default Setting
