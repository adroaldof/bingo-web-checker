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
    setDrawnNumber([...drawnNumbers, value])
    const updated = cards.map((card) => main.card.drawCardNumber.execute({ card, number: value }))
    setCards(updated)
  }

  const addCard = (card: Card) => {
    setCards([...cards, card])
  }

  return (
    <main className="prose md:container md:mx-auto prose-stone">
      <header className="p-4 md:px-0">
        <h1 className="mb-0">Bingo</h1>
      </header>
      <aside className="flex w-full">
        <section className="justify-between w-2/3 gap-4 p-4 pt-0 bg-slate-200 md:flex">
          <DrawnNumberForm onSuccess={addDrawnNumber} />
          <LastDrawnNumbers drawnNumbers={drawnNumbers} />
        </section>
        <section className="justify-between w-1/3 gap-4 p-4 pt-0 bg-slate-100 md:flex">
          <DrawnNumbers drawnNumbers={drawnNumbers} />
        </section>
      </aside>
      <aside className="flex w-full">
        <section className="justify-between w-1/3 gap-4 p-4 pt-0 mt-4 bg-slate-100 md:flex">
          <CreateCardForm onSuccess={addCard} />
        </section>
        <section className="justify-between w-2/3 gap-4 p-4 pt-0 mt-4 bg-slate-200 md:flex">
          <Cards cards={cards} />
        </section>
      </aside>
    </main>
  )
}
