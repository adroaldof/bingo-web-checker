import { CardEntity, Card } from '@/entities/card/Card'

export class CreateCard {
  constructor() {}

  execute(input: CreateCardInput): Card {
    const cardNumbers = input.cardNumbers.split(',').map((number) => parseInt(number))
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
