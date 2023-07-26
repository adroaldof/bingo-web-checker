import { Card } from '@/entities/card/Card'
import React from 'react'

export const Cards = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="flex flex-col w-full text-gray-500 bg-gray-200 rounded" data-cy="card">
      <h3>Cartelas</h3>
      {cards.length ? (
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) => (
            <CardComponent key={card.uuid} card={card} />
          ))}
        </div>
      ) : (
        <div className="p-2 bg-slate-300">
          <p className="m-0">Não há nenhum cartão cadastrado</p>
        </div>
      )}
    </div>
  )
}

const CardComponent = ({ card }: { card: Card }) => {
  const {
    id,
    results: { row, column, diagonal, complete, checkedCount },
  } = card
  return (
    <div className="flex flex-col max-w-md text-gray-500 bg-gray-100 rounded min-w-md min-w-sm" data-cy="card">
      <div className="flex items-center justify-between p-2 bg-gray-300" data-cy="card">
        <div className="text-sm font-bold" data-cy="card-result-id">
          {card.id}
        </div>
        <div
          className={`p-2 text-center font-bold text-sm rounded-sm bg-blue-300 text-gray-800 w-16`}
          data-cy={`card-${id}-result-count`}
        >
          {checkedCount}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1 p-2" data-cy="card">
        <div
          className={`py-2 text-center font-bold text-sm rounded-sm ${complete ? 'bg-green-400 text-gray-800' : ''}`}
          data-cy={`card-${id}-result-complete`}
        >
          Bingo
        </div>
        <div
          className={`py-2 text-center font-bold text-sm rounded-sm ${diagonal ? 'bg-green-400 text-gray-800' : ''}`}
          data-cy={`card-${id}-result-diagonal`}
        >
          Diag.
        </div>
        <div
          className={`py-2 text-center font-bold text-sm rounded-sm ${row ? 'bg-green-400 text-gray-800' : ''}`}
          data-cy={`card-${id}-result-row`}
        >
          Linha
        </div>
        <div
          className={`py-2 text-center font-bold text-sm rounded-sm ${column ? 'bg-green-400 text-gray-800' : ''}`}
          data-cy={`card-${id}-result-column`}
        >
          Coluna
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 p-2 bg-gray-300" data-cy="card">
        {card.spots
          .flatMap((row) => row)
          .map((piece, index) => {
            return piece ? (
              <div
                key={`card-${id}-spot-${piece.number}`}
                data-cy={`card-${id}-spot-${piece.number}`}
                className={`rounded-sm p-2 text-center ${piece.isDrawn && 'bg-green-500 text-gray-800'}`}
              >
                {piece.number < 10 ? `0${piece.number}` : piece.number}
              </div>
            ) : (
              <div key={`spot-random-${index}`} className="p-2 text-center">
                -
              </div>
            )
          })}
      </div>
    </div>
  )
}
