import store from 'store'
import avatar from './girl.png'

class User {
  static currentUser () {
    let coin = store.get('user.coin')
    if (coin === undefined) coin = 200
    return { avatar, coin }
  }

  static setCoin (value) {
    // TODO: CALL API endpoint to set coin
    store.set('user.coin', value)
  }
}

export default User
