import React from 'react'

type LastDrawNumbersProps = {
  drawnNumbers: number[]
}

export const LastDrawnNumbers = ({ drawnNumbers }: LastDrawNumbersProps) => {
  return (
    <div className="flex flex-col w-1/2">
      <h3>Últimos soteados</h3>
      <div className="p-2 bg-slate-300">
        {drawnNumbers.length ? (
          <div className="grid grid-cols-5 gap-1">
            {drawnNumbers
              .slice(-5)
              .reverse()
              .map((number, index) => (
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
