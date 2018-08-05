export const loadAsset = (scene, assetSpec) => {
  const { assetScaleBy, assetScale, assetScaleBase } = assetSpec
  const gameSize = assetScaleBy === 'height' ? scene.sys.game.config.height : scene.sys.game.config.width
  const assetSize = assetScale * assetScaleBase
  const scale = gameSize / assetSize

  return { ...assetSpec, scale }
}
