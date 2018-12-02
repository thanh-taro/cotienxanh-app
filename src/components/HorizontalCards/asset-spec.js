import xSound from './x.mp3'
import meoW from './w_meo.png'
import choW from './w_cho.png'
import heoW from './w_heo.png'
import boW from './w_bo.png'
import meo1W from './w_meo1.png'
import cho1W from './w_cho1.png'
import heo1W from './w_heo1.png'
import bo1W from './w_bo1.png'
import meoI from './i_meo.png'
import choI from './i_cho.png'
import heoI from './i_heo.png'
import boI from './i_bo.png'
import meo1I from './i_meo1.png'
import cho1I from './i_cho1.png'
import heo1I from './i_heo1.png'
import bo1I from './i_bo1.png'

const assetSpec = {
  assetScaleBy: 'height',
  assetScale: 4,
  assetScaleBase: 320,
  assetWidth: 512,
  assetHeight: 320,
  assetCollection: [
    { key: 'meoI', asset: meoI },
    { key: 'choI', asset: choI },
    { key: 'heoI', asset: heoI },
    { key: 'boI', asset: boI },
    { key: 'meo1I', asset: meo1I },
    { key: 'cho1I', asset: cho1I },
    { key: 'heo1I', asset: heo1I },
    { key: 'bo1I', asset: bo1I },
    { key: 'meoW', asset: meoW },
    { key: 'choW', asset: choW },
    { key: 'heoW', asset: heoW },
    { key: 'boW', asset: boW },
    { key: 'meo1W', asset: meo1W },
    { key: 'cho1W', asset: cho1W },
    { key: 'heo1W', asset: heo1W },
    { key: 'bo1W', asset: bo1W }
  ],
  soundCollection: [
    { key: 'meo', asset: xSound },
    { key: 'cho', asset: xSound },
    { key: 'heo', asset: xSound },
    { key: 'bo', asset: xSound },
    { key: 'meo1', asset: xSound },
    { key: 'cho1', asset: xSound },
    { key: 'heo1', asset: xSound },
    { key: 'bo1', asset: xSound }
  ]
}

export default assetSpec
