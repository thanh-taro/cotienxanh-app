import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import WaitScene from './scenes/WaitScene'
import CheckUserScene from './scenes/CheckUserScene'
import HomeScene from './scenes/HomeScene'
import GameOneScene from './scenes/GameOneScene'
import GameFourScene from './scenes/GameFourScene'
import FindPairScene from './scenes/FindPairScene'
import FantasticRotationScene from './scenes/FantasticRotationScene'
import SortingCharactersScene from './scenes/SortingCharactersScene'
import FindCharactersScene from './scenes/FindCharactersScene'
import UpdatePlugin from 'phaser-plugin-update'
import GameThreeScene from './scenes/GameThreeScene'
import GameTwoListScene from './scenes/GameTwoListScene'
import GameTwoSubOneScene from './scenes/GameTwoSubOneScene'
import GameTwoSubTwoScene from './scenes/GameTwoSubTwoScene'
import FindRightAnswerScene from './scenes/FindRightAnswerScene'

export const title = 'Vui học cùng Cô Tiên Xanh'
export const version = '0.0.1'
export const parent = 'game-panel'
export const type = Phaser.CANVAS
export const resolution = Math.min(window.devicePixelRatio || 1, 2)
export const width = document.documentElement.clientWidth
export const height = document.documentElement.clientHeight
export const zoom = 1
export const pixelArt = false
export const roundPixels = true
export const physics = {
  default: 'arcade',
  arcade: {
    gravity: { y: 800 },
    debug: false
  }
}
export const plugins = {
  scene: [{ key: 'updatePlugin', plugin: UpdatePlugin, mapping: 'updates' }]
}
export const scene = [ BootScene, WaitScene, CheckUserScene, HomeScene, GameOneScene, GameTwoListScene, GameTwoSubOneScene, GameTwoSubTwoScene, GameThreeScene, GameFourScene, FindPairScene, FantasticRotationScene, SortingCharactersScene, FindCharactersScene, FindRightAnswerScene ]
export const allowedTime = 1800
export const waitTime = 3600
