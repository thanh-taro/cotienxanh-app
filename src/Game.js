import Phaser from 'phaser'
import * as config from './config'
import store from 'store'

export default class Game extends Phaser.Game {
  constructor () {
    super(config)

    window.startTime = Date.now()
    store.each((value, key) => {
      if (key.substring(key.length - 5, key.length) === 'Scene') store.remove(key)
    })
  }
}
