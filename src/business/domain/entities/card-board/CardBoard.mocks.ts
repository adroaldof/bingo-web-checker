import { CardBoard, CardBoardInput } from './CardBoard'
import { faker } from '@faker-js/faker'
import { mockCard } from '../card/Card.mocks'
import { mock } from 'node:test'

export const mockCardBoard = (overrides: Partial<CardBoardInput> = {}): CardBoard =>
  new CardBoard({
    name: faker.string.alpha(10),
    ...overrides,
  })
