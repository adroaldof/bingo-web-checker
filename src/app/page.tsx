'use client'
import { main } from '@/business/main'
import { Cards } from '@/components/Cards'
import { CreateCardForm } from '@/components/CreateCardForm'
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
      <aside className="grid w-full gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
        <DrawnNumberForm onSuccess={addDrawnNumber} />
        <LastDrawnNumbers drawnNumbers={drawnNumbers} />
        <DrawnNumbers drawnNumbers={drawnNumbers} />
      </aside>
      <aside className="w-full">
        <Cards cards={cards} addCard={addCard} />
      </aside>
    </main>
  )
}
