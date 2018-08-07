import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import HomeScene from './scenes/HomeScene'

export const title = 'Vui học cùng Cô Tiên Xanh'
export const version = '0.0.1'
export const parent = 'game-panel'
export const type = Phaser.CANVAS
export const resolution = window.devicePixelRatio || 1
export const width = document.documentElement.clientWidth
export const height = document.documentElement.clientHeight
export const zoom = 1
export const pixelArt = false
export const roundPixels = true
export const input = {
  activePointer: 10
}
export const physics = {
  default: 'arcade',
  arcade: {
    gravity: { y: 800 },
    debug: false
  }
}
export const scene = [ BootScene, HomeScene ]
