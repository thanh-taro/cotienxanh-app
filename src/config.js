import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import HomeScene from './scenes/HomeScene'

export const title = 'Vui học cùng Cô Tiên Xanh'
export const version = '0.0.1'
export const parent = 'game-panel'
export const type = Phaser.AUTO
export const resolution = window.devicePixelRatio || 1
export const width = document.documentElement.clientWidth * 2
export const height = document.documentElement.clientHeight * 2
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
export const scene = [ BootScene, HomeScene ]
