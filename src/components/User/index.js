import store from 'store'
import axios from 'axios'

class User {
  static storeUser (user) {
    user.coin = parseInt(user.coin)
    store.set('user', user)
  }

  static currentUser () {
    let user = store.get('user')

    if (undefined !== user && undefined === user.coin) user.coin = 200

    return user
  }

  static setCoin (coin) {
    let user = store.get('user')
    const id = user.id

    user.coin = coin
    store.set('user', user)
    axios.post('http://api.cotienxanh.edu.vn/set-coin', { id, coin })
  }
}

export default User
