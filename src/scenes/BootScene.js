import Phaser from 'phaser'
import LogoImage from '../components/LogoImage'
import Setting from '../components/Setting'
import GameOneWelcomeAudio from '../components/GameOneWelcomeAudio'
import GameFourWelcomeAudio from '../components/GameFourWelcomeAudio'
import GameOneTilemap from '../components/GameOneTilemap'
import GameOnePlayer from '../components/GameOnePlayer'
import GamePadLeftButton from '../components/GamePadLeftButton'
import GamePadRightButton from '../components/GamePadRightButton'
import GamePadUpButton from '../components/GamePadUpButton'
import HomeButton from '../components/HomeButton'
import MusicButton from '../components/MusicButton'
import CollectCoinAudio from '../components/CollectCoinAudio'
import HitQuestSound from '../components/HitQuestSound'
import Arrow from '../components/Arrow'
import BackButton from '../components/BackButton'
import CoinBadge from '../components/CoinBadge'
import DiamondBadge from '../components/DiamondBadge'
import ClockBadge from '../components/ClockBadge'
import WelcomeAudio from '../components/WelcomeAudio'
import BackgroundAudio from '../components/BackgroundAudio'
import HomeBackgroundImage from '../components/HomeBackgroundImage'
import GameOneBloonImage from '../components/GameOneBloonImage'
import GameTwoBloonImage from '../components/GameTwoBloonImage'
import GameThreeBloonImage from '../components/GameThreeBloonImage'
import GameFourBloonImage from '../components/GameFourBloonImage'
import Cards from '../components/Cards'
import HorizontalCards from '../components/HorizontalCards'
import QuicksandWebfont from '../components/QuicksandWebfont'
import { destroyObject, checkPlayTime } from '../helpers'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import CeremonySound from '../components/CeremonySound'
import FindPairGuideSound from '../components/FindPairGuideSound'
import FantasticRotationGuideSound from '../components/FantasticRotationGuideSound'
import SortingCharactersGuideSound from '../components/SortingCharactersGuideSound'
import FindCharactersGuideSound from '../components/FindCharactersGuideSound'
import LevelEasyButton from '../components/LevelEasyButton'
import LevelNormalButton from '../components/LevelNormalButton'
import LevelHardButton from '../components/LevelHardButton'
import LevelHardestButton from '../components/LevelHardestButton'

class BootScene extends Phaser.Scene {
  static get KEY () {
    return 'BootScene'
  }

  constructor () {
    super({ key: BootScene.KEY })

    this.things = {}
  }

  init () {
    this.sound.pauseOnBlur = false
    if (!Setting.MUSIC_ENABLED) this.sound.setMute(true)
  }

  preload () {
    this.makeLoadBar()

    LogoImage.preload(this)
    GameOneWelcomeAudio.preload(this)
    GameFourWelcomeAudio.preload(this)
    GameOneTilemap.preload(this)
    GamePadLeftButton.preload(this)
    GamePadRightButton.preload(this)
    GamePadUpButton.preload(this)
    GameOnePlayer.preload(this)
    CollectCoinAudio.preload(this)
    HitQuestSound.preload(this)
    HomeButton.preload(this)
    Arrow.preload(this)
    BackButton.preload(this)
    CoinBadge.preload(this)
    DiamondBadge.preload(this)
    ClockBadge.preload(this)
    HomeBackgroundImage.preload(this)
    GameOneBloonImage.preload(this)
    GameTwoBloonImage.preload(this)
    GameThreeBloonImage.preload(this)
    GameFourBloonImage.preload(this)
    MusicButton.preload(this)
    BackgroundAudio.preload(this)
    WelcomeAudio.preload(this)
    Cards.preload(this)
    HorizontalCards.preload(this)
    QuicksandWebfont.preload(this)
    RightSound.preload(this)
    WrongSound.preload(this)
    CeremonySound.preload(this)
    FindPairGuideSound.preload(this)
    FantasticRotationGuideSound.preload(this)
    SortingCharactersGuideSound.preload(this)
    FindCharactersGuideSound.preload(this)
    LevelEasyButton.preload(this)
    LevelNormalButton.preload(this)
    LevelHardButton.preload(this)
    LevelHardestButton.preload(this)
  }

  create () {
    this.things.logoImage = this.makeLogoImage()
  }

  update () {
    if (this.things.logoImage.finished === 1) this.moveToNextScene()
  }

  makeLoadBar () {
    const loadingWidth = Math.min(this.cameras.main.width * 0.8, 500)
    const loadingHeight = 50
    const centerX = this.cameras.main.centerX
    const centerY = this.cameras.main.centerY

    let progressBar = this.add.graphics()
    let progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(centerX - loadingWidth / 2, centerY - loadingHeight / 2, loadingWidth, loadingHeight)

    let loadingText = this.make.text({
      x: centerX,
      y: centerY - loadingHeight / 2 - 18,
      text: 'Đang tải trò chơi ...',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    let percentText = this.make.text({
      x: centerX,
      y: centerY,
      text: '0%',
      style: {
        font: '16px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    let assetText = this.make.text({
      x: centerX,
      y: centerY + loadingHeight / 2 + 14,
      text: '',
      style: {
        font: '14px monospace',
        fill: '#ffffff'
      }
    })
    assetText.setOrigin(0.5, 0.5)

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%')
      progressBar.clear()
      progressBar.fillStyle(0x66bb6a, 1)
      progressBar.fillRect(centerX - loadingWidth / 2 + 10, centerY - loadingHeight / 2 + 10, (loadingWidth - 20) * value, loadingHeight - 20)
    })

    this.load.on('fileprogress', (file) => {
      assetText.setText('Đang tải tập tin: ' + file.key)
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      assetText.destroy()
    })

    assetText.setText('Đang tải font chữ: Quicksand')
  }

  makeLogoImage () {
    return new LogoImage(this, this.physics.world.bounds.centerX, this.physics.world.bounds.centerY)
  }

  moveToNextScene () {
    destroyObject(this.things.logoImage)
    this.input.addPointer(3)

    checkPlayTime(this.scene, false)
  }
}

export default BootScene
