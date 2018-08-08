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
    scene.load.spritesheet('GameOneTilemap.tilesets', scaledAsset.tilesets, { frameWidth: scaledAssetWidth, frameHeight: scaledAssetHeight })
  }

  constructor (scene, addImmediately = true, attributes = {}) {
    const rawMapData = scene.cache.tilemap.get(GameOneTilemap.KEY)
    const mapData = Phaser.Tilemaps.Parsers.Parse(GameOneTilemap.KEY, rawMapData.format, rawMapData.data)

    super(scene, mapData)

    for (let key in attributes) this[key] = attributes[key]

    const tileset = this.addTilesetImage('tilesets', 'GameOneTilemap.tilesets')
    this.backgroundLayer = this.createStaticLayer('background-layer', tileset)
    this.platformLayer = this.createStaticLayer('platform-layer', tileset, 0, 0)
    this.objectLayer = this.createStaticLayer('object-layer', tileset, 0, 0)
    this.coinLayer = this.createStaticLayer('coin-layer', tileset, 0, 0)
    this.questLayer = this.createStaticLayer('quest-layer', tileset, 0, 0)

    this.setLayer(this.platformLayer)
    this.setCollision([13, 51, 63, 64, 50, 76, 77])

    if (addImmediately) this.addToGame(scene)
  }

  addToGame (scene) {
    scene.add.existing(this)
    scene.physics.world.setBounds(0, 0, this.widthInPixels, this.heightInPixels)
    scene.cameras.main.setBounds(0, 0, this.widthInPixels, this.heightInPixels)
  }
}

export default GameOneTilemap
