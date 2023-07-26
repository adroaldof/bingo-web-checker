import { CardEntity, Card } from '@/entities/card/Card'

export class DrawnCardNumber {
  constructor() {}

  execute(input: DrawnCardNumberInput): Card {
    const card = new CardEntity(input.card)
    card.draw(input.number)
    return card.toJson()
  }
}

type DrawnCardNumberInput = {
  card: Card
  number: number
}
