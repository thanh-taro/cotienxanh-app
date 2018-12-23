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

export const removeTimbre = (index) => {
  var array = {
    'á': 'a',
    'à': 'a',
    'ả': 'a',
    'ã': 'a',
    'ạ': 'a',
    'ắ': 'ă',
    'ằ': 'ă',
    'ẳ': 'ă',
    'ẵ': 'ă',
    'ặ': 'ă',
    'ấ': 'â',
    'ầ': 'â',
    'ẩ': 'â',
    'ẫ': 'â',
    'ậ': 'â',
    'é': 'e',
    'è': 'e',
    'ẻ': 'e',
    'ẽ': 'e',
    'ẹ': 'e',
    'ế': 'ê',
    'ề': 'ê',
    'ể': 'ê',
    'ễ': 'ê',
    'ệ': 'ê',
    'í': 'i',
    'ì': 'i',
    'ỉ': 'i',
    'ĩ': 'i',
    'ị': 'i',
    'ó': 'o',
    'ò': 'o',
    'ỏ': 'o',
    'õ': 'o',
    'ọ': 'o',
    'ố': 'ô',
    'ồ': 'ô',
    'ổ': 'ô',
    'ỗ': 'ô',
    'ộ': 'ô',
    'ớ': 'ơ',
    'ờ': 'ơ',
    'ở': 'ơ',
    'ỡ': 'ơ',
    'ợ': 'ơ',
    'ú': 'u',
    'ù': 'u',
    'ủ': 'u',
    'ũ': 'u',
    'ụ': 'u',
    'ứ': 'ư',
    'ừ': 'ư',
    'ử': 'ư',
    'ữ': 'ư',
    'ự': 'ư',
    'ý': 'y',
    'ỳ': 'y',
    'ỷ': 'y',
    'ỹ': 'y',
    'ỵ': 'y'
  }
  return array[index] ? array[index] : index;
}
