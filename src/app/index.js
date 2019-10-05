import './css/fonts.css'
import './css/index.css'
import '../../node_modules/tingle.js/dist/tingle.css'
import Game from '../Game'

const startGame = function () {
  window.game = new Game()
}

if (window.cordova) {
  let app = {
    initialize: function () {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
      document.addEventListener('pause', this.onPause.bind(this), false)
      document.addEventListener('resume', this.onResume.bind(this), false)
    },
    onDeviceReady: function () {
      // When the device is ready, start Phaser Boot state.
      window.StatusBar.hide()
      window.screen.orientation.lock('landscape')
      window.AndroidFullScreen.isSupported(function () {
        window.AndroidFullScreen.isImmersiveModeSupported(function () {
          window.AndroidFullScreen.immersiveMode()
        })
      })
      startGame()
    },
    onPause: function () {
      window.game.sound.pauseAll()
    },
    onResume: function () {
      window.game.sound.resumeAll()
    }
  }

  app.initialize()
} else {
  startGame()
}
