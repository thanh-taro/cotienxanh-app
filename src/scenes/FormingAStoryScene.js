import Phaser from 'phaser'
import MusicButton from '../components/MusicButton'
import BackButton from '../components/BackButton'
import HorizontalCards from '../components/HorizontalCards'
import RightSound from '../components/RightSound'
import WrongSound from '../components/WrongSound'
import Cards from '../components/Cards'
import MainGameScene from './MainGameScene'
import { destroyObject, randItem, randSplice } from '../helpers'
import AskSound from '../components/AskSound'
import Text from '../components/Text'
import storiesContent from '../storiesContent'

class FormingAStoryScene extends Phaser.Scene {
  static get KEY () {
    return 'FormingAStoryScene'
  }

  static get WIN_DIAMOND () {
    return 1
  }

  constructor () {
    super({ key: FormingAStoryScene.KEY })
    this.things = {}
  }

  create (data) {

    this.things = {
      stories: {
        // 'easy': ['story_1'],
        'easy': ['story_1', 'story_2', 'story_5', 'story_6', 'story_7'],
        'normal': ['story_3', 'story_4']
      },
      'numberOfPaintings': {
        'story_1': 4,
        'story_2': 4,
        'story_3': 5,
        'story_4': 5,
        'story_5': 3,
        'story_6': 4,
        'story_7': 4,
      },
    }
    this.cameras.main.setBackgroundColor('#AED581')

    this.things.level = data.level
    this.createMusicButton()
    this.createBackButton()
    this.createQuestionCards()
    this.createTheAnswerCards()
  }

  createQuestionCards () {
    const level = this.things.level
    const question = this.things.question = randItem(this.things.stories[level])
    const total = this.things.numberOfPaintings[question]
    this.things.storySound = this.sound.add(HorizontalCards.KEY + '-' + question + '-sound')

    this.things.questionCards = []

    var arrayIndex = []
    for (let i = 0; i < total; i++) {
      let key = question + '_' + (i + 1)
      const config = this.configTheQuestionCard(i, total)
      let card = new HorizontalCards(this, key, config.x, config.y, config.scale, 1, false, false, true, {}, true)
      card.number = i
      this.things.questionCards.push(card)
      this.input.setDraggable(card)
      arrayIndex.push(i)
    }

    // randSplice questionCards
    for (let i = 0; i < total; i++) {
      let realNumber = randSplice(arrayIndex)
      const config = this.configTheQuestionCard(realNumber, total)
      let card = this.things.questionCards[i]
      card.x = config.x
      card.y = config.y
      card.realNumber = realNumber
    }
    this.createTheDragFeature()
  }

  createTheAnswerCards () {
    const question = this.things.question
    const total = this.things.numberOfPaintings[question]
    this.things.answerCards = []
    for (let i = 0; i < total; i++) {
      let key = 'position' + '_' + (i + 1)
      const config = this.configTheQuestionCard(i, total, true)
      let card = new HorizontalCards(this, key, config.x, config.y, config.scale, 1, false, false, true, {}, true)
      card.number = i
      this.things.answerCards.push(card)
    }
  }

  configTheQuestionCard (number, total, isAnswer = false) {
    const { assetWidth, assetHeight } = HorizontalCards.ASSET_SPEC
    const padding = parseInt(this.cameras.main.width * 0.01)
    const startX = 50
    const endX = this.cameras.main.width - startX
    const width = (endX - startX) / total
    const height = this.cameras.main.height / 2
    const scaleX =((total == 3 ? width - 100 : width) - padding) / assetWidth
    const scaleY = height / assetHeight
    const scale = Math.min(scaleX, scaleY)
    const x = parseInt((startX + padding / 2 + (number * width) + width / 2))
    const positionY = isAnswer ? 1 : 2
    const y = this.cameras.main.height / 3 * positionY

    return { x, y, scale }
  }

  createTheDragFeature () {
    this.input.dragDistanceThreshold = 16
    this.input.on('dragstart', (pointer, gameObject) => {
      this.children.bringToTop(gameObject)
      this.things.originalX = gameObject.x
      this.things.originalY = gameObject.y
    })

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.input.on('dragend', (pointer, gameObject) => {
      var answerCards = this.things.answerCards
      let minY = this.cameras.main.height / 3  - gameObject.displayHeight / 2
      let maxY = this.cameras.main.height / 3 + gameObject.displayHeight / 2
      var isSwap = false
      if (pointer.y > minY && pointer.y < maxY) {
        for (let index in answerCards) {
          let card = answerCards[index]
          let minX = card.x - card.displayWidth / 2
          let maxX = card.x + card.displayWidth / 2
          if (pointer.x > minX && pointer.x < maxX && card.number == gameObject.number) {
            gameObject.x = card.x
            gameObject.y = card.y
            destroyObject(card)
            this.things.answerCards.splice(index, 1)
            isSwap = true
            break
          }
        }
      }
      if (!isSwap) {
        gameObject.x = this.things.originalX
        gameObject.y = this.things.originalY
      } else {
        gameObject.input.draggable = false
        if (answerCards.length == 0) this.won()
      }
    })
  }

  createMusicButton () {
    destroyObject(this.things.musicButton)

    this.things.musicButton = new MusicButton(this)
  }

  createBackButton () {
    destroyObject(this.things.backButton)

    this.things.backButton = new BackButton(this, MainGameScene.KEY, this.stopSound.bind(this))
  }

  playRightSound (delay = 0) {
    if (this.things.rightSound === undefined) this.things.rightSound = this.sound.add(RightSound.KEY)
    this.things.rightSound.stop()
    this.things.rightSound.play({ delay })
  }

  playWrongSound (delay = 0) {
    if (this.things.wrongSound === undefined) this.things.wrongSound = this.sound.add(WrongSound.KEY)
    this.things.wrongSound.stop()
    this.things.wrongSound.play({ delay })
  }

  stopWrongSound () {
    if (this.things.wrongSound) this.things.wrongSound.stop()
  }

  won () {
    this.createSpeaker()
    this.playRightSound()
    const askSound = this.sound.add(AskSound.KEY)
    var delay = 1.2
    askSound.play({ delay: delay })

    delay = (delay + askSound.duration) * 1000
    this.time.delayedCall(delay, () => {
      this.things.speaker.emit('pointerdown')
      this.runStoryContent()
    })

    delay += this.things.storySound.duration * 1000
    this.time.delayedCall(delay, () => {
      this.scene.stop()
      this.scene.resume(MainGameScene.KEY, { from: FormingAStoryScene.KEY, diamond: FormingAStoryScene.WIN_DIAMOND })
    })
  }

  runStoryContent () {
    const y = this.cameras.main.height / 3 * 2
    var text = new Text(this, 100, y , '')

    text.setWordWrapWidth(this.cameras.main.width - 200, true)
    this.things.text = text
    this.things.storyContent = storiesContent[this.things.question]

    this.things.line = []

    this.things.wordIndex = 0
    this.things.lineIndex = 0

    console.log(this.things.storySound.duration);
    console.log(this.things.storyContent[0].split(' ').length);
    this.things.wordDelay = (this.things.storySound.duration - 2) * 1000 / this.things.storyContent[0].split(' ').length
    console.log(this.things.wordDelay);
    this.things.lineDelay = 40
    this.nextLine()
  }

  nextLine () {
    if (this.things.lineIndex === this.things.storyContent.length) {
      //  We're finished
      return;
    }

    //  Split the current line on spaces, so one word per array element
    this.things.line = this.things.storyContent[this.things.lineIndex].split(' ');
    //  Reset the word index to zero (the first word in the line)
    this.things.wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    this.time.addEvent({
      delay: this.things.wordDelay,
      callback: this.nextWord,
      callbackScope: this,
      repeat: this.things.line.length - 1
    });

    //  Advance to the next line
    this.things.lineIndex++;
  }

  nextWord() {
    //  Add the next word onto the text string, followed by a space
    this.things.text.text = this.things.text.text.concat(this.things.line[this.things.wordIndex] + " ");
    let y = this.cameras.main.height - 100 - (this.things.text.height / 2)
    this.things.text.y = y
    //  Advance the word index to the next word in the line
    this.things.wordIndex++;
    //  Last word?
    if (this.things.wordIndex === this.things.line.length) {
      //  Add a carriage return
      this.things.text.text = this.things.text.text.concat("\n");

      //  Get the next line after the lineDelay amount of ms has elapsed
      this.time.addEvent({
        delay: this.things.lineDelay,
        callback: this.nextLine,
        callbackScope: this,
      });
    }
  }

  createSpeaker () {
    this.things.speaker = new Cards(this, 'speakerI', 0, { x: -500, y: -500, scale: 0.5, hasSound: false, allowClick: true }, null, true, {}, () => this.things.storySound.play())
  }

  stopSound () {
    if (this.things.storySound) this.things.storySound.stop()
  }
}

export default FormingAStoryScene
