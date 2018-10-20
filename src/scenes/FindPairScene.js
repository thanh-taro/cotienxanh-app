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
    this.things.level = data.level

    this.createMusicButton()
    this.createBackButton()

    this.generate()
  }

  generate () {
    let lowercaseList = ['a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y']
    let keys = []

    const level = this.things.level
    const sublevel = randItem([
      'only-lower', 'only-upper', 'only-handwriting',
      'mix-lower-upper', 'mix-lower-handwriting', 'mix-upper-handwriting'
    ])

    switch (level + '.' + sublevel) {
      case 'easy.only-lower':
        for (let i = 0; i < 2; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item)
          keys.push(item)
        }
        break

      case 'easy.only-upper':
        for (let i = 0; i < 2; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item.toUpperCase())
          keys.push(item.toUpperCase())
        }
        break

      case 'easy.only-handwriting':
        for (let i = 0; i < 2; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item + 'H')
          keys.push(item + 'H')
        }
        break

      case 'easy.mix-lower-upper':
        for (let i = 0; i < 2; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item)
          keys.push(item.toUpperCase())
        }
        break

      case 'easy.mix-lower-handwriting':
        for (let i = 0; i < 2; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item)
          keys.push(item + 'H')
        }
        break

      case 'easy.mix-upper-handwriting':
        for (let i = 0; i < 2; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item.toUpperCase())
          keys.push(item + 'H')
        }
        break

      case 'normal.only-lower':
        for (let i = 0; i < 4; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item)
          keys.push(item)
        }
        break

      case 'normal.only-upper':
        for (let i = 0; i < 4; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item.toUpperCase())
          keys.push(item.toUpperCase())
        }
        break

      case 'normal.only-handwriting':
        for (let i = 0; i < 4; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item + 'H')
          keys.push(item + 'H')
        }
        break

      case 'normal.mix-lower-upper':
        for (let i = 0; i < 4; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item)
          keys.push(item.toUpperCase())
        }
        break

      case 'normal.mix-lower-handwriting':
        for (let i = 0; i < 4; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item)
          keys.push(item + 'H')
        }
        break

      case 'normal.mix-upper-handwriting':
        for (let i = 0; i < 4; i++) {
          let item = randSplice(lowercaseList)
          keys.push(item.toUpperCase())
          keys.push(item + 'H')
        }
        break
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
    card.allowClick = false
    this.stopGuideSound()

    if (!this.things.openCards) this.things.openCards = []

    if (this.things.openCards.length === 0) this.things.openCards.push(card)
    else if (this.things.openCards.length === 1 && this.things.openCards[0].indexKey !== card.indexKey) {
      this.things.openCards.push(card)
      this.checkOpenCards()
    }
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

      this.time.delayedCall(2000, () => {
        for (let index in deleteIndexes) {
          let deleteIndex = deleteIndexes[index] - index * 1
          destroyObject(this.things.cards[deleteIndex])
          this.things.cards.splice(deleteIndex, 1)
        }

        if (this.things.cards.length === 0) this.won()
      })
    }

    this.things.openCards = []
    this.time.delayedCall(2000, () => {
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
    if (this.things.rightSound === undefined) this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay: 1.2 })
  }

  playWrongSound () {
    if (this.things.wrongSound === undefined) this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay: 1.2 })
  }

  won () {
    this.stopGuideSound()

    this.scene.stop()
    this.scene.resume(GameOneScene.KEY, { from: FindPairScene.KEY, coin: FindPairScene.WIN_COIN })
  }
}

export default FindPairScene
