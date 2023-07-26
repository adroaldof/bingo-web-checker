import { CreateCard } from '@/use-cases/CreateCard'
import { DrawnCardNumber } from '@/use-cases/DrawnCardNumber'

const createCard = new CreateCard()
const drawCardNumber = new DrawnCardNumber()

export const main = {
  card: {
    createCard,
    drawCardNumber,
  },
}
