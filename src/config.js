import Phaser from 'phaser'
import UpdatePlugin from 'phaser-plugin-update'
import BootScene from './scenes/BootScene'
import WaitScene from './scenes/WaitScene'
import CheckUserScene from './scenes/CheckUserScene'
import HomeScene from './scenes/HomeScene'
import MainGameScene from './scenes/MainGameScene'
import GameOneScene from './scenes/GameOneScene'
import GameTwoScene from './scenes/GameTwoScene'
import GameThreeScene from './scenes/GameThreeScene'
import GameFourScene from './scenes/GameFourScene'
import GameOneSubOneScene from './scenes/GameOneSubOneScene'
import GameOneSubTwoScene from './scenes/GameOneSubTwoScene'
import GameOneSubThreeScene from './scenes/GameOneSubThreeScene'
import GameOneSubFourScene from './scenes/GameOneSubFourScene'
import GameTwoSubOneScene from './scenes/GameTwoSubOneScene'
import GameTwoSubTwoScene from './scenes/GameTwoSubTwoScene'
import LittleTalentScene from './scenes/LittleTalentScene'
import PuzzleScene from './scenes/PuzzleScene'
import FindPairScene from './scenes/FindPairScene'
import ChooseTheRightPictureScene from './scenes/ChooseTheRightPictureScene'
import FantasticRotationScene from './scenes/FantasticRotationScene'
import SortingCharactersScene from './scenes/SortingCharactersScene'
import FindCharactersScene from './scenes/FindCharactersScene'
import FormingAStoryScene from './scenes/FormingAStoryScene'
import MoveTheImagesToTheRightGroups from './scenes/MoveTheImagesToTheRightGroups'
import MoveTheImagesToTheRightPositionsScene from './scenes/MoveTheImagesToTheRightPositionsScene'
import CompleteTheStoriesScene from './scenes/CompleteTheStoriesScene'

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
export const scene = [
  BootScene, WaitScene, CheckUserScene, HomeScene, MainGameScene,
  GameOneScene, GameOneSubOneScene, GameOneSubTwoScene, GameOneSubThreeScene, GameOneSubFourScene,
  GameTwoScene, GameTwoSubOneScene, GameTwoSubTwoScene,
  GameThreeScene,
  GameFourScene,
  CompleteTheStoriesScene, MoveTheImagesToTheRightPositionsScene,ChooseTheRightPictureScene, FindPairScene, FantasticRotationScene, SortingCharactersScene, FindCharactersScene, FormingAStoryScene, LittleTalentScene, PuzzleScene, MoveTheImagesToTheRightGroups
]
export const allowedTime = 1800
export const waitTime = 3600
