import { CardEntity, CardInput } from './Card'
import { faker } from '@faker-js/faker'

export const mockCard = (overrides: Partial<CardInput> = {}): CardEntity => {
  const defaultRowsAndColumns = 5
  return new CardEntity({
    uuid: faker.string.uuid(),
    rows: defaultRowsAndColumns,
    columns: defaultRowsAndColumns,
    cardNumbers: generateUniqueCardNumbers(),
    ...overrides,
  })
}

export const generateUniqueCardNumbers = (input?: { length: number }): number[] => {
  const { length } = input || { length: 24 }
  const cardNumbers: number[] = []
  while (cardNumbers.length < length) {
    const randomNumber = faker.number.int({ min: 1, max: 90 })
    if (!cardNumbers.includes(randomNumber)) {
      cardNumbers.push(randomNumber)
    }
  }
  return cardNumbers
}
