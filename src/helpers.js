export const loadAsset = (scene, assetSpec) => {
  const { assetScaleBy, assetScale, assetScaleBase, assets, assetWidth, assetHeight } = assetSpec
  const gameSize = assetScaleBy === 'height' ? scene.sys.game.config.height : scene.sys.game.config.width
  const assetSize = assetScale * assetScaleBase
  const scale = gameSize / assetSize

  let result = { ...assetSpec, scale }
  if (assets !== undefined) {
    const intScale = Math.min(Math.ceil(scale), assets.length)
    result.intScale = intScale
    result.scaledAsset = assets[intScale - 1]
    result.scaledAssetWidth = (assetWidth / assetScale) * intScale
    result.scaledAssetHeight = (assetHeight / assetScale) * intScale
  }

  return result
}

export const destroyObject = (object) => {
  if (object === undefined) return
  if (object.destroy) object.destroy()
  object = null
}

export const isTouchableDevice = () => {
  return 'ontouchstart' in document.documentElement
}

export const randItem = (items) => {
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

export const randSplice = (items) => {
  const index = Math.floor(Math.random() * items.length)
  const item = items.splice(index, 1)

  return item[0]
}

export const shuffle = (items) => {
  let ctr = items.length
  let temp
  let index

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr)
    ctr--
    temp = items[ctr]
    items[ctr] = items[index]
    items[index] = temp
  }

  return items
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}
