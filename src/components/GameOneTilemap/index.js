import Phaser from 'phaser'
import tiledMap from './map.jsonf'
import backgroundTileset from './background-tileset.png'

class GameOneTilemap extends Phaser.Tilemaps.Tilemap {
  static get KEY () {
    return 'GameOneTilemap'
  }

  static preload (game) {
    game.load.tilemapTiledJSON(GameOneTilemap.KEY, tiledMap)
    game.load.spritesheet('tiles', backgroundTileset, { frameWidth: 64, frameHeight: 64 })
  }

  constructor (game, addImmediately = true, attributes = {}) {
    const rawMapData = game.cache.tilemap.get(GameOneTilemap.KEY)
    const mapData = Phaser.Tilemaps.Parsers.Parse(GameOneTilemap.KEY, rawMapData.format, rawMapData.data)

    super(game.scene.scene, mapData)

    for (let key in attributes) this[key] = attributes[key]

    const tileset = this.addTilesetImage('background-tileset', 'tiles', 64, 64)
    const backgroundLayer = this.createStaticLayer('background-layer', tileset, 0, 0)
    game.physics.world.bounds.width = backgroundLayer.width
    game.physics.world.bounds.height = backgroundLayer.height

    if (addImmediately) this.addToGame(game)
  }

  addToGame (game) {
    game.add.existing(this)
    game.cameras.main.setBounds(0, 0, this.widthInPixels, this.heightInPixels)
  }
}

export default GameOneTilemap
