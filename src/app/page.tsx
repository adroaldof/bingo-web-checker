'use client'
import { main } from '@/business/main'
import { Cards } from '@/components/Cards'
import { DrawnNumberForm } from '@/components/DrawnNumberForm'
import { DrawnNumbers } from '@/components/DrawnNumbers'
import { LastDrawnNumbers } from '@/components/LastDrawnNumbers'
import { Card } from '@/entities/card/Card'
import { useState } from 'react'

export default function Home() {
  const [drawnNumbers, setDrawnNumber] = useState<number[]>([])
  const [cards, setCards] = useState<Card[]>([])

  const addDrawnNumber = (value: number) => {
    if (drawnNumbers.includes(value)) return
    setDrawnNumber([value, ...drawnNumbers])
    const updated = cards.map((card) => main.card.drawCardNumber.execute({ card, number: value }))
    setCards(updated)
  }

  const addCard = (card: Card) => {
    setCards([...cards, card])
  }

  return (
    <main className="p-4 prose md:container md:mx-auto prose-stone">
      <header className="py-4 md:p-4 md:px-0">
        <h1 className="mb-0">Bingo</h1>
      </header>
      <div className="grid grid-cols-4 gap-4">
        <aside className="flex flex-col gap-4">
          <DrawnNumberForm onSuccess={addDrawnNumber} />
          <LastDrawnNumbers drawnNumbers={drawnNumbers} />
          <DrawnNumbers drawnNumbers={drawnNumbers} />
        </aside>
        <aside className="col-span-3">
          <Cards cards={cards} addCard={addCard} />
        </aside>
      </div>
    </main>
  )
}
