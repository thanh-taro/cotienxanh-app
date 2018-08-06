import './css/fonts.css'
import './css/index.css'
import Game from '../Game'

const startGame = function () {
  window.game = new Game()
}

if (window.cordova) {
  let app = {
    initialize: function () {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },
    // deviceready Event Handler
    onDeviceReady: function () {
      // When the device is ready, start Phaser Boot state.
      startGame()
    }
  }

  app.initialize()
} else {
  startGame()
}
