import { expect, it } from 'vitest'
import { CreateCard } from './CreateCard'
import { generateUniqueCardNumbers } from '@/entities/card/Card.mocks'

it('creates an empty card', async () => {
  const createCard = new CreateCard()
  const input = { cardNumbers: generateUniqueCardNumbers().join(',') }
  const output = createCard.execute(input)
  const { spots, results } = output
  expect(output).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      rows: expect.any(Number),
      columns: expect.any(Number),
      spots: expect.any(Array),
      results: expect.any(Object),
    }),
  )
  expect(results).toEqual(
    expect.objectContaining({
      uuid: expect.any(String),
      id: expect.any(String),
      row: expect.any(Boolean),
      column: expect.any(Boolean),
      diagonal: expect.any(Boolean),
      complete: expect.any(Boolean),
      checkedCount: expect.any(Number),
    }),
  )
  expect(spots).toEqual(
    expect.arrayContaining([
      expect.arrayContaining([
        expect.objectContaining({
          uuid: expect.any(String),
          number: expect.any(Number),
          isDrawn: expect.any(Boolean),
        }),
      ]),
    ]),
  )
})
