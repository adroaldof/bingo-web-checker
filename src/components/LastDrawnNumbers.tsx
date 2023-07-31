import React from 'react'

type LastDrawNumbersProps = {
  drawnNumbers: number[]
}

export const LastDrawnNumbers = ({ drawnNumbers }: LastDrawNumbersProps) => {
  return (
    <div className="w-full p-4 bg-slate-200">
      <h3 className="m-0">Último Sorteado</h3>
      <p className="m-0">Número: {drawnNumbers[0]}</p>
      <h3 className="m-0">Últimos Sorteados</h3>
      <div className="p-1 bg-slate-100">
        {drawnNumbers.length ? (
          <div className="grid grid-cols-10 gap-1">
            {drawnNumbers.map((number, index) => (
              <div
                key={index}
                data-cy={`last-drawn-${number}`}
                className="flex justify-center flex-1 p-1 text-green-900 bg-green-300 rounded-sm"
              >
                {number}
              </div>
            ))}
          </div>
        ) : (
          <p className="m-0">O sorteio não iniciou ainda</p>
        )}
      </div>
    </div>
  )
}
