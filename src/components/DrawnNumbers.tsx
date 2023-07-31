import React from 'react'

type DrawnNumbersProps = {
  drawnNumbers: number[]
}

export const DrawnNumbers = ({ drawnNumbers }: DrawnNumbersProps) => {
  return (
    <div className="w-full p-4 bg-slate-100 md:col-span-2 lg:col-span-1">
      <h3 className="m-0">{drawnNumbers.length ? drawnNumbers.length : ''} Números Sorteados </h3>
      <div data-cy="drawn-numbers" className="grid grid-cols-10 gap-1 p-1 grid-rows-10 bg-slate-200">
        {Array.from(Array(90).keys()).map((number) => {
          const gridNumber = number + 1
          const isDrawn = drawnNumbers.includes(+gridNumber)
          const backgroundColor = isDrawn ? 'green' : 'gray'
          const textColor = isDrawn ? 'green' : 'gray'
          return (
            <div
              key={gridNumber}
              data-cy={`drawn-${gridNumber}`}
              className={`bg-${backgroundColor}-300 p-1 flex flex-1 justify-center rounded-sm text-${textColor}-700`}
            >
              {gridNumber < 10 ? `0${gridNumber}` : gridNumber}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const sortAscending = (firstNumber: number, secondNumber: number) => firstNumber - secondNumber
