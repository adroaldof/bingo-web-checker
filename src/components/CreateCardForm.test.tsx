import React from 'react'
import { vi, it, Mock, expect } from 'vitest'
import { CreateCardForm } from './CreateCardForm'
import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { generateUniqueCardNumbers } from '@/entities/card/Card.mocks'

let onSuccess: Mock<any, any>

beforeEach(() => {
  onSuccess = vi.fn()
})

const setup = (ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
  return {
    user: userEvent.setup(),
    ...render(ui),
  }
}

it('creates a card with only numbers and commas', async () => {
  const numbersInput = generateUniqueCardNumbers().join(',')
  const { user } = setup(<CreateCardForm onSuccess={onSuccess} />)
  const cardIdInput = await screen.findByRole('textbox', { name: /id/i })
  const cardId = faker.string.nanoid()
  await user.type(cardIdInput, cardId)
  const cardNumbersInput = await screen.findByRole('textbox', { name: /números/i })
  await user.type(cardNumbersInput, numbersInput)
  await user.click(screen.getByRole('button', { name: /adicionar cartela de bingo/i }))
  expect(onSuccess).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(String),
      spots: expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({
            uuid: expect.any(String),
            number: expect.any(Number),
            isDrawn: expect.any(Boolean),
          }),
        ]),
      ]),
    }),
  )
})

it('creates a card even with a lot of formatting numbers', async () => {
  const numbersInput = `1 , 2, 3 ,  4,5
,6    , 7 ,8,9,10 ONLY NUMBERS WILL BE KEPT
   ,  1 1, 1 2 ,13,14,    1 .5
      ,16,17,18,19,20         ,
      2 XXX 1 ,22,23,WILL 2 BE 4 CLEANED        `
  const { user } = setup(<CreateCardForm onSuccess={onSuccess} />)
  const cardIdInput = await screen.findByRole('textbox', { name: /id/i })
  const cardId = faker.string.nanoid()
  await user.type(cardIdInput, cardId)
  const cardNumbersInput = await screen.findByRole('textbox', { name: /números/i })
  await user.type(cardNumbersInput, numbersInput)
  await user.click(screen.getByRole('button', { name: /adicionar cartela de bingo/i }))
  expect(onSuccess).toHaveBeenCalledWith(
    expect.objectContaining({
      id: expect.any(String),
      spots: expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({
            uuid: expect.any(String),
            number: expect.any(Number),
            isDrawn: expect.any(Boolean),
          }),
        ]),
      ]),
    }),
  )
})

it('shows empty spot message', async () => {
  const [firstNumber, ...numbersInput] = generateUniqueCardNumbers()
  const input = [firstNumber, , ...numbersInput.slice(0, -1)].join(',')
  const { user } = setup(<CreateCardForm onSuccess={onSuccess} />)
  const cardIdInput = await screen.findByRole('textbox', { name: /id/i })
  const cardId = faker.string.nanoid()
  await user.type(cardIdInput, cardId)
  const cardNumbersInput = await screen.findByRole('textbox', { name: /números/i })
  await user.type(cardNumbersInput, input)
  await user.click(screen.getByRole('button', { name: /adicionar cartela de bingo/i }))
  await screen.findByText(
    /há descrições que não contém número. por favor, verifique os espaço entre as vírgulas novamente/i,
  )
})

it('shows wrong numbers length message', async () => {
  const [, ...numbersInput] = generateUniqueCardNumbers()
  const { user } = setup(<CreateCardForm onSuccess={onSuccess} />)
  const cardIdInput = await screen.findByRole('textbox', { name: /id/i })
  const cardId = faker.string.nanoid()
  await user.type(cardIdInput, cardId)
  const cardNumbersInput = await screen.findByRole('textbox', { name: /números/i })
  await user.type(cardNumbersInput, numbersInput.join(','))
  await user.click(screen.getByRole('button', { name: /adicionar cartela de bingo/i }))
  await screen.findByText(/deve incluir 24 números separados por vírgula/i)
})

it('shows duplicated numbers message', async () => {
  const [firstNumber, ...numbersInput] = generateUniqueCardNumbers()
  const input = [firstNumber, firstNumber, ...numbersInput.slice(0, -1)].join(',')
  const { user } = setup(<CreateCardForm onSuccess={onSuccess} />)
  const cardIdInput = await screen.findByRole('textbox', { name: /id/i })
  const cardId = faker.string.nanoid()
  await user.type(cardIdInput, cardId)
  const cardNumbersInput = await screen.findByRole('textbox', { name: /números/i })
  await user.type(cardNumbersInput, input)
  await user.click(screen.getByRole('button', { name: /adicionar cartela de bingo/i }))
  await screen.findByText(/não pode haver números repetidos/i)
})
