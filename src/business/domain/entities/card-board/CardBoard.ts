import { Card } from '../card/Card'
import { v4 as uuidV4 } from 'uuid'

export type CardBoardInput = {
  name?: string
}

export class CardBoard {
  uuid: string
  name: string
  drawnNumbers: number[] = []
  cards: Card[] = []

  constructor({ name = uuidV4() }: CardBoardInput = {}) {
    this.uuid = uuidV4()
    this.name = name
  }

  addCard(card: Card) {
    this.cards.push(card)
    this.drawnNumbers.sort(sortAscending)
  }

  addDrawnNumber(number: number) {
    this.drawnNumbers.push(number)
    this.drawnNumbers.sort((a, b) => a - b)
    this.cards.forEach((card) => card.draw(number))
  }
}

const sortAscending = (firstNumber: number, secondNumber: number) => firstNumber - secondNumber
