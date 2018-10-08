import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import GameOneScene from './GameOneScene'
import { destroyObject, randItem, randSplice, shuffle } from '../helpers'
import Cards from '../components/Cards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import FindPairGuideSound from '../components/FindPairGuideSound'

class FindPairScene extends Phaser.Scene {
  static get KEY () {
    return 'FindPairScene'
  }

  static get WIN_COIN () {
    return 100
  }

  constructor () {
    super({ key: FindPairScene.KEY })

    this.things = {}
  }

  create (data) {
    this.cameras.main.setBackgroundColor('#000000')

    if (!data.noGuide) this.playGuideSound()

    this.createMusicButton()
    this.createBackButton()

    this.generate()
  }

  generate () {
    const level = randItem(['super-easy', 'easy', 'normal', 'hard', 'super-hard', 'hardest'])
    let lowercaseList = ['a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y']

    let keys = []
    if (level === 'super-easy') {
      for (let i = 0; i < 2; i++) {
        let item = randSplice(lowercaseList)
        keys.push(item)
        keys.push(item)
      }
    } else if (level === 'easy') {
      for (let i = 0; i < 3; i++) {
        let item = randSplice(lowercaseList)
        keys.push(item)
        keys.push(item)
      }
    } else if (level === 'normal') {
      for (let i = 0; i < 4; i++) {
        let item = randSplice(lowercaseList)
        keys.push(item)
        keys.push(item)
      }
    } else if (level === 'hard') {
      for (let i = 0; i < 2; i++) {
        let item = randSplice(lowercaseList)
        keys.push(item)
        keys.push(item.toUpperCase())
      }
    } else if (level === 'super-hard') {
      for (let i = 0; i < 4; i++) {
        let item = randSplice(lowercaseList)
        keys.push(item)
        keys.push(item.toUpperCase())
      }
    } else if (level === 'hardest') {
      for (let i = 0; i < 4; i++) {
        let item = randSplice(lowercaseList)
        keys.push(item)
        keys.push(item + 'H')
      }
    }

    keys = shuffle(keys)

    for (let index in this.things.cards) destroyObject(this.things.cards[index])

    this.things.cards = []

    for (let index in keys) {
      let key = keys[index]

      let number = parseInt(index) + 1
      this.things.cards.push(new Cards(this, key, number, keys.length, this.onCardOpen.bind(this)))
    }
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, GameOneScene.KEY, () => {
      this.stopGuideSound()
    })
  }

  onCardOpen (card) {
    if (!this.things.openCards) this.things.openCards = []

    if (this.things.openCards.length < 2) this.things.openCards.push(card)

    if (this.things.openCards.length === 1) card.sound.play()
    else if (this.things.openCards.length === 2) this.checkOpenCards()
  }

  checkOpenCards () {
    for (let index in this.things.cards) this.things.cards[index].allowClick = false

    const cardOne = this.things.openCards[0]
    const cardTwo = this.things.openCards[1]

    if (cardOne.cardKey.toLowerCase() !== cardTwo.cardKey.toLowerCase()) {
      this.playWrongSound()

      cardOne.flipIn()
      cardTwo.flipIn()
    } else {
      this.playRightSound()

      let deleteIndexes = []
      for (let index in this.things.cards) if (this.things.cards[index].indexKey === cardOne.indexKey || this.things.cards[index].indexKey === cardTwo.indexKey) deleteIndexes.push(index)

      this.time.delayedCall(1000, () => {
        for (let index in deleteIndexes) {
          let deleteIndex = deleteIndexes[index] - index * 1
          destroyObject(this.things.cards[deleteIndex])
          this.things.cards.splice(deleteIndex, 1)
        }

        if (this.things.cards.length === 0) this.won()
      })
    }

    this.things.openCards = []
    this.time.delayedCall(1000, () => {
      for (let index in this.things.cards) this.things.cards[index].allowClick = true
    })
  }

  playGuideSound () {
    this.things.guideSound = this.sound.add(FindPairGuideSound.KEY)
    this.things.guideSound.play({ delay: 1.5 })
  }

  stopGuideSound () {
    if (this.things.guideSound) this.things.guideSound.stop()
  }

  playRightSound () {
    this.stopGuideSound()

    if (this.things.rightSound === undefined) this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play()
  }

  playWrongSound () {
    this.stopGuideSound()

    if (this.things.wrongSound === undefined) this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play()
  }

  won () {
    this.stopGuideSound()

    this.scene.stop()
    this.scene.resume(GameOneScene.KEY, { from: FindPairScene.KEY, coin: FindPairScene.WIN_COIN })
  }
}

export default FindPairScene
