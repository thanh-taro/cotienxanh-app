import Phaser from 'phaser'
import * as config from './config'

export default class Game extends Phaser.Game {
  constructor () {
    super(config)
  }
}
