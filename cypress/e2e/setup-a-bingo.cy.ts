import { generateUniqueCardNumbers } from '../../src/business/domain/entities/card/Card.mocks'
import { faker } from '@faker-js/faker'

describe('setup a bingo', () => {
  let cardId: string
  let cardNumbers: number[]

  beforeEach(() => {
    cardId = faker.string.nanoid()
    cardNumbers = generateUniqueCardNumbers()
  })

  it('adds numbers to the drawn numbers', () => {
    cy.visit('/')
    const firstDrawnNumber = faker.number.int({ min: 1, max: 90 })
    cy.get('[data-cy="drawn-number-input"]').type(`${firstDrawnNumber}`)
    cy.get('[data-cy="drawn-number-submit"]').click()
    cy.get(`[data-cy="drawn-${firstDrawnNumber}"]`).should(($p) => {
      expect($p).to.contain(`${firstDrawnNumber}`)
      expect($p).to.have.class('bg-green-300')
    })
    cy.get(`[data-cy="last-drawn-${firstDrawnNumber}"]`).should('have.class', 'bg-green-300')
    const secondDrawnNumber = faker.number.int({ min: 1, max: 90 })
    cy.get('[data-cy="drawn-number-input"]').type(`${secondDrawnNumber}`)
    cy.get('[data-cy="drawn-number-submit"]').click()
    cy.get(`[data-cy="drawn-${secondDrawnNumber}"]`).should(($p) => {
      expect($p).to.contain(`${secondDrawnNumber}`)
      expect($p).to.have.class('bg-green-300')
    })
    cy.get(`[data-cy="last-drawn-${secondDrawnNumber}"]`).should('have.class', 'bg-green-300')
  })

  it('adds a card to the board', () => {
    cy.visit('/')
    cy.get('[data-cy="card-id"]').type(cardId)
    cy.get('[data-cy="card-numbers"]').type(cardNumbers.join(','))
    cy.get('[data-cy="add-card-submit"]').click()
    cy.get(`[data-cy="card-${cardId}-spot-${cardNumbers[0]}"]`).should(($p) => {
      expect($p).to.contain(`${cardNumbers[0]}`)
    })
  })

  it('marks a spot on a card when it is draw', () => {
    cy.visit('/')
    cy.get('[data-cy="card-id"]').type(cardId)
    cy.get('[data-cy="card-numbers"]').type(cardNumbers.join(','))
    cy.get('[data-cy="add-card-submit"]').click()
    const drawnNumber = cardNumbers[0]
    cy.get('[data-cy="drawn-number-input"]').type(`${drawnNumber}`)
    cy.get('[data-cy="drawn-number-submit"]').click()
    cy.get(`[data-cy="card-${cardId}-spot-${drawnNumber}"]`).should(($p) => {
      expect($p).to.have.class('bg-green-500')
    })
  })

  it('make row background blue when it is completed', () => {
    cy.visit('/')
    cy.get('[data-cy="card-id"]').type(cardId)
    cy.get('[data-cy="card-numbers"]').type(cardNumbers.join(','))
    cy.get('[data-cy="add-card-submit"]').click()
    cardNumbers.slice(0, 5).forEach((drawnNumber) => {
      cy.get('[data-cy="drawn-number-input"]').type(`${drawnNumber}`)
      cy.get('[data-cy="drawn-number-submit"]').click()
    })
    cy.get(`[data-cy="card-${cardId}-result-row"]`).should('have.class', 'bg-green-400')
  })

  it('make column background blue when it is completed', () => {
    cy.visit('/')
    cy.get('[data-cy="card-id"]').type(cardId)
    cy.get('[data-cy="card-numbers"]').type(cardNumbers.join(','))
    cy.get('[data-cy="add-card-submit"]').click()
    const rowIndexes = [0, 5, 10, 15, 20].map((index) => cardNumbers[index + 1])
    rowIndexes.forEach((drawnNumber) => {
      cy.get('[data-cy="drawn-number-input"]').type(`${drawnNumber}`)
      cy.get('[data-cy="drawn-number-submit"]').click()
    })
    cy.get(`[data-cy="card-${cardId}-result-column"]`).should('have.class', 'bg-green-400')
  })

  it('make diagonal background blue when it is completed', () => {
    cy.visit('/')
    cy.get('[data-cy="card-id"]').type(cardId)
    cy.get('[data-cy="card-numbers"]').type(cardNumbers.join(','))
    cy.get('[data-cy="add-card-submit"]').click()
    const rowIndexes = [0, 1, 2, 3, 4].map((index) => cardNumbers[index * 6])
    rowIndexes.forEach((drawnNumber) => {
      cy.get('[data-cy="drawn-number-input"]').type(`${drawnNumber}`)
      cy.get('[data-cy="drawn-number-submit"]').click()
    })
    cy.get(`[data-cy="card-${cardId}-result-diagonal"]`).should('have.class', 'bg-green-400')
  })

  it('make bingo from one of the six cards', () => {
    cy.visit('/')
    cy.get('[data-cy="card-id"]').type(cardId)
    cy.get('[data-cy="card-numbers"]').type(cardNumbers.join(','))
    cy.get('[data-cy="add-card-submit"]').click()
    Array.from({ length: 5 }).forEach(() => {
      const newCardNumbers = generateUniqueCardNumbers()
      cy.get('[data-cy="card-id"]').type(faker.string.nanoid())
      cy.get('[data-cy="card-numbers"]').type(newCardNumbers.join(','))
      cy.get('[data-cy="add-card-submit"]').click()
    })
    cardNumbers.forEach((drawnNumber) => {
      cy.get('[data-cy="drawn-number-input"]').type(`${drawnNumber}`)
      cy.get('[data-cy="drawn-number-submit"]').click()
    })
    cy.get(`[data-cy="card-${cardId}-result-complete"]`).should('have.class', 'bg-green-400')
  })
})
