import Phaser from 'phaser'
import { loadAsset } from '../../helpers'
import assetSpec from './asset-spec'

class GameOneTilemap extends Phaser.Tilemaps.Tilemap {
  static get KEY () {
    return 'GameOneTilemap'
  }

  static preload (scene) {
    const { scaledAsset, scaledAssetWidth, scaledAssetHeight } = loadAsset(scene, assetSpec)
    scene.load.tilemapTiledJSON(GameOneTilemap.KEY, scaledAsset.tilemap)
    scene.load.spritesheet(GameOneTilemap.KEY + '.tileset', scaledAsset.tileset, { frameWidth: scaledAssetWidth, frameHeight: scaledAssetHeight, margin: 1, spacing: 2 })
  }

  constructor (scene, addImmediately = true, attributes = {}) {
    const rawMapData = scene.cache.tilemap.get(GameOneTilemap.KEY)
    const mapData = Phaser.Tilemaps.Parsers.Parse(GameOneTilemap.KEY, rawMapData.format, rawMapData.data)
    const { backgroundColor, playerStartX, playerStartY } = mapData.properties

    super(scene, mapData)

    for (let key in attributes) this[key] = attributes[key]

    const tileset = this.addTilesetImage('tileset', GameOneTilemap.KEY + '.tileset')
    this.backgroundLayer = this.createStaticLayer('background-layer', tileset)
    this.platformLayer = this.createStaticLayer('platform-layer', tileset, 0, 0)
    this.objectLayer = this.createStaticLayer('object-layer', tileset, 0, 0)
    this.coinLayer = this.createDynamicLayer('coin-layer', tileset, 0, 0)
    this.questLayer = this.createDynamicLayer('quest-layer', tileset, 0, 0)
    this.backgroundColor = backgroundColor
    this.playerStartX = playerStartX * this.tileWidth
    this.playerStartY = playerStartY * this.tileHeight

    this.setLayer(this.platformLayer)
    this.setCollision([9, 61, 62, 68, 69, 70, 71])

    if (addImmediately) this.addToGame(scene)
  }

  addToGame (scene) {
    scene.add.existing(this)
    scene.physics.world.setBounds(0, 0, this.widthInPixels, this.heightInPixels)
    scene.cameras.main.setBounds(0, 0, this.widthInPixels, this.heightInPixels)
    scene.cameras.main.setBackgroundColor(this.backgroundColor)
  }
}

export default GameOneTilemap
