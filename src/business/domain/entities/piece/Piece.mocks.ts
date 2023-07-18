import { faker } from '@faker-js/faker'
import { Piece, PieceInput } from './Piece'

export const mockPiece = (overrides: Partial<PieceInput> = {}): Piece =>
  new Piece({
    number: faker.number.int(),
    isDrawn: faker.datatype.boolean(),
    ...overrides,
  })
