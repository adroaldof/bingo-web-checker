import { beforeEach, expect, it } from 'vitest'
import { CardEntity } from './Card'
import { faker } from '@faker-js/faker'
import { generateUniqueCardNumbers } from './Card.mocks'

let piece: number
const defaultIndexes = [0, 1, 2, 3, 4]

beforeEach(() => {
  piece = faker.number.int({ min: 0, max: 100 })
})

it('sets a card with 5 rows and 5 columns', () => {
  const card = new CardEntity()
  expect(card.rows).toBe(5)
  expect(card.columns).toBe(5)
})

it('a card have rows, columns and pieces', () => {
  const card = new CardEntity()
  const output = card.toJson()
  expect(output).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      rows: expect.any(Number),
      columns: expect.any(Number),
      spots: expect.any(Array),
    }),
  )
})

it('each spot should be null when not set', () => {
  const card = new CardEntity()
  const output = card.toJson()
  const { spots } = output
  spots.forEach((row) => {
    row.forEach((spot) => {
      expect(spot).toBeUndefined()
    })
  })
})

it('throws when trying to add a piece to a non existing row', () => {
  const card = new CardEntity()
  expect(() => card.setPiece(6, 1, piece)).toThrow('Row does not exist')
})

it('throws when trying to add a piece to a non existing column', () => {
  const card = new CardEntity()
  expect(() => card.setPiece(1, 6, piece)).toThrow('Column does not exist')
})

it('throws when try to add a number greater than 100', () => {
  const card = new CardEntity()
  const piece = faker.number.int({ min: 101, max: 200 })
  expect(() => card.setPiece(1, 1, piece)).toThrow('Number must be lower than 100')
})

it('sets a piece to the second row third column', () => {
  const card = new CardEntity()
  const row = 1
  const column = 2
  card.setPiece(row, column, piece)
  const output = card.toJson()
  const currentPiece = output.spots[row][column]
  expect(currentPiece?.number).toBe(piece)
  expect(currentPiece?.isDrawn).toBe(false)
})

it('draws a piece', () => {
  const card = new CardEntity()
  const rowAndColumn = 2
  card.setPiece(rowAndColumn, rowAndColumn, piece)
  card.draw(piece)
  const output = card.toJson()
  const currentPiece = output.spots[rowAndColumn][rowAndColumn]
  expect(currentPiece?.number).toBe(piece)
  expect(currentPiece?.isDrawn).toBe(true)
})

it('returns winning on complete row', () => {
  const card = new CardEntity()
  const row = 1
  defaultIndexes.forEach((column) => {
    const piece = faker.number.int({ min: 0, max: 100 })
    card.setPiece(row, column, piece)
    card.draw(piece)
  })
  const output = card.toJson()
  expect(output.results.row).toBe(true)
})

it('returns winning on complete column', () => {
  const card = new CardEntity()
  const column = 1
  defaultIndexes.forEach((row) => {
    const piece = faker.number.int({ min: 0, max: 100 })
    card.setPiece(row, column, piece)
    card.draw(piece)
  })
  const output = card.toJson()
  expect(output.results.column).toBe(true)
})

it('returns winning on complete descending diagonals', () => {
  const card = new CardEntity()
  defaultIndexes.forEach((index) => {
    const piece = faker.number.int({ min: 0, max: 100 })
    card.setPiece(index, index, piece)
    card.draw(piece)
  })
  const output = card.toJson()
  expect(output.results.diagonal).toBe(true)
})

it('returns winning on complete ascending diagonals', () => {
  const card = new CardEntity()
  defaultIndexes.forEach((index) => {
    const piece = faker.number.int({ min: 0, max: 100 })
    card.setPiece(4 - index, index, piece)
    card.draw(piece)
  })
  const output = card.toJson()
  expect(output.results.diagonal).toBe(true)
})

it('returns winning on complete all numbers', () => {
  const card = new CardEntity()
  defaultIndexes.forEach((row) => {
    defaultIndexes.forEach((column) => {
      const piece = faker.number.int({ min: 0, max: 100 })
      card.setPiece(row, column, piece)
      card.draw(piece)
    })
  })
  const output = card.toJson()
  expect(output.results.complete).toBe(true)
})

it('returns winning on complete custom card row and column', () => {
  const card = new CardEntity({ rows: 3, columns: 5 })
  ;[0, 1, 2].forEach((row) => {
    defaultIndexes.forEach((column) => {
      const piece = faker.number.int({ min: 0, max: 100 })
      card.setPiece(row, column, piece)
      card.draw(piece)
    })
  })
  const output = card.toJson()
  expect(output.results.complete).toBe(true)
})

it('generates a card passing the numbers', () => {
  const cardNumbers = generateUniqueCardNumbers()
  const card = new CardEntity({ cardNumbers })
  const cardOutput = card.toJson()
  expect(cardOutput.spots[0][0]).not.toBeNull()
  expect(cardOutput.spots[4][4]).not.toBeNull()
})

it('the center card must be empty and marked as drawn', () => {
  const cardNumbers = generateUniqueCardNumbers()
  const card = new CardEntity({ cardNumbers })
  const { spots } = card.toJson()
  expect(spots[2][2]).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      number: expect.any(Number),
      isDrawn: true,
    }),
  )
})
