import { Card } from '../card/Card'
import { CardBoard } from './CardBoard'
import { expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'

it('sets a card board with empty cards', () => {
  const cardBoard = new CardBoard()
  expect(cardBoard.cards).toHaveLength(0)
})

it('add a card to the board', () => {
  const cardBoard = new CardBoard({ name: faker.person.firstName() })
  const card = new Card({ uuid: faker.string.uuid() })
  cardBoard.addCard(card)
  expect(cardBoard.cards).toHaveLength(1)
})

it('add a number to the draw numbers in ascending order', () => {
  const cardBoard = new CardBoard({ name: faker.person.firstName() })
  const card = new Card({ uuid: faker.string.uuid() })
  cardBoard.addCard(card)
  const number = faker.number.int({ min: 0, max: 100 })
  cardBoard.addDrawnNumber(55)
  cardBoard.addDrawnNumber(99)
  cardBoard.addDrawnNumber(10)
  expect(cardBoard.drawnNumbers).toEqual([10, 55, 99])
})

it('call card draw method on every draw piece', () => {
  const cardBoard = new CardBoard({ name: faker.person.firstName() })
  const card = new Card({ uuid: faker.string.uuid() })
  const cardSpy = vi.spyOn(card, 'draw')
  cardBoard.addCard(card)
  const firstNumber = faker.number.int({ min: 0, max: 100 })
  cardBoard.addDrawnNumber(firstNumber)
  const secondNumber = faker.number.int({ min: 0, max: 100 })
  cardBoard.addDrawnNumber(secondNumber)
  expect(cardSpy).toHaveBeenCalledWith(firstNumber)
  expect(cardSpy).toHaveBeenCalledWith(secondNumber)
})
