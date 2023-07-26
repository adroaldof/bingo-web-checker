import { CreateCard } from '@/use-cases/CreateCard'

const createCard = new CreateCard()

export const main = {
  card: {
    createCard,
  },
}
