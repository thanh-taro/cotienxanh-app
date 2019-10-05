import User from '../User'
import assetSpec from './asset-spec'

class Text extends Phaser.GameObjects.Text{
  constructor (scene, x, y, text, data = {}, addToScene = true, config = {}) {
    super(scene, x, y, text)

    const align = data.align ? data.align : assetSpec.align
    const fontFamily = data.fontFamily ? data.fontFamily : assetSpec.fontFamily
    const color = data.color ? data.color : assetSpec.color
    const fontSize = data.fontSize ? data.fontSize : assetSpec.fontSize

    Phaser.GameObjects.BuildGameObject(scene, this, { ...config, x, y })
    this.setOrigin(0, 0.5)
    this.setScrollFactor(0)
    this.setAlign(align)
    this.setFontFamily(fontFamily)
    this.setColor(color)
    this.setFontSize(fontSize)
    this.text = text

    if (addToScene) this.addToScene(scene)
  }

  addToScene (scene) {
    scene.add.existing(this)
  }

  updateTextContent(text) {
    this.setText(text)
  }
}


export default Text
