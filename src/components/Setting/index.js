import store from 'store'

class Setting {
  static get MUSIC_ENABLED_KEY () {
    return 'music.enabled'
  }

  static get MUSIC_ENABLED () {
    let value = store.get(Setting.MUSIC_ENABLED_KEY)
    if (value === undefined) value = true

    return value
  }

  static set MUSIC_ENABLED (value) {
    return store.set(Setting.MUSIC_ENABLED_KEY, value)
  }
}

export default Setting
