import { expect, it } from 'vitest'
import { mockCard } from '@/entities/card/Card.mocks'
import { DrawnCardNumber } from './DrawnCardNumber'

it('drawn a card number', async () => {
  const rowAndColumn = 1
  const card = mockCard().toJson()
  const selectedSpot = card.spots[rowAndColumn][rowAndColumn]
  const drawnCardNumber = new DrawnCardNumber()
  const output = drawnCardNumber.execute({ card, number: selectedSpot!.number })
  expect(output.spots[rowAndColumn][rowAndColumn]?.isDrawn).toBeTruthy()
})
