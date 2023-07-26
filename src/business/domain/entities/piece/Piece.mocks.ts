import { faker } from '@faker-js/faker'
import { PieceEntity, PieceInput } from './Piece'

export const mockPiece = (overrides: Partial<PieceInput> = {}): PieceEntity =>
  new PieceEntity({
    number: faker.number.int(),
    isDrawn: faker.datatype.boolean(),
    ...overrides,
  })
