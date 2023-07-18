import { Card, CardInput } from './Card'
import { faker } from '@faker-js/faker'

export const mockCard = (overrides: Partial<CardInput> = {}): Card => {
  const defaultRowsAndColumns = 5
  return new Card({
    uuid: faker.string.uuid(),
    rows: defaultRowsAndColumns,
    columns: defaultRowsAndColumns,
    cardNumbers: Array.from({ length: 25 }, (_, index) => index + 1),
    ...overrides,
  })
}
