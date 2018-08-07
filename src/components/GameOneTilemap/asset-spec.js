import tilemap from './map.jsonf'
import tilemap2x from './map2x.jsonf'
import tilemap3x from './map3x.jsonf'
import tilesets from './tilesets.png'
import tilesets2x from './tilesets2x.png'
import tilesets3x from './tilesets3x.png'

const assetSpec = {
  asset: { tilemap, tilesets },
  assetScaleBy: 'height',
  assetScale: 1,
  assetScaleBase: 320,
  assetWidth: 32,
  assetHeight: 32,
  assets: [{
    tilemap: tilemap, tilesets: tilesets
  }, {
    tilemap: tilemap2x, tilesets: tilesets2x
  }, {
    tilemap: tilemap3x, tilesets: tilesets3x
  }]
}

export default assetSpec
