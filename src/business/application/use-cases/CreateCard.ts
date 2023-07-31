import { CardEntity, Card } from '@/entities/card/Card'

export class CreateCard {
  constructor() {}

  execute(input: CreateCardInput): Card {
    const cardNumbers = cleanCardNumbers(input.cardNumbers)
    const cardInput = { ...input, cardNumbers }
    const createdCard = new CardEntity(cardInput)
    return createdCard.toJson()
  }
}

type CreateCardInput = {
  cardNumbers: string
  rows?: number
  columns?: number
}

const cleanCardNumbers = (cardNumbers: string): number[] =>
  cardNumbers.split(',').map((number) => parseInt(String(number).replace(/[^0-9]/g, '')))
