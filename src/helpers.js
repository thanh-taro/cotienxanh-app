export const loadAsset = (scene, assetSpec) => {
  const { side, base, items } = assetSpec
  const size = side === 'height' ? scene.sys.game.config.height : scene.sys.game.config.width
  const percent = Math.floor(Math.max(1, size / base))

  return percent <= items.length ? items[percent - 1] : items[items.length - 1]
}
