import tilemap from './map.jsonf'
import tilemap2x from './map2x.jsonf'
import tilemap3x from './map3x.jsonf'
import tilemap4x from './map4x.jsonf'
import tileset from './tileset.png'
import tileset2x from './tileset2x.png'
import tileset3x from './tileset3x.png'
import tileset4x from './tileset4x.png'

const assetSpec = {
  asset: { tilemap, tileset },
  assetScaleBy: 'height',
  assetScale: 1,
  assetScaleBase: 320,
  assetWidth: 32,
  assetHeight: 32,
  assets: [{
    tilemap: tilemap, tileset: tileset
  }, {
    tilemap: tilemap2x, tileset: tileset2x
  }, {
    tilemap: tilemap3x, tileset: tileset3x
  }, {
    tilemap: tilemap4x, tileset: tileset4x
  }]
}

export default assetSpec
