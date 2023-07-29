import { main } from '@/business/main'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type CreateCardFormProps = {
  onSuccess: (data: any) => void
}

export const CreateCardForm = ({ onSuccess }: CreateCardFormProps) => {
  const { handleSubmit, register, reset, setFocus, formState } = useForm<CreateCardSchema>({
    resolver: zodResolver(createCardSchema),
    defaultValues: {
      id: '',
      cardNumbers: '',
      rows: 5,
      columns: 5,
    },
  })

  const { errors } = formState

  const onSubmit = (data: any) => {
    const card = main.card.createCard.execute(data)
    onSuccess(card)
    reset()
    setFocus('id')
  }

  return (
    <div className="w-full p-4 pb-2 bg-slate-200">
      <h3 className="m-0">Adicionar Cartela</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 md:items-start">
        <div className="w-full">
          <label className="block">
            <span className="block">ID:</span>
            <input
              type="text"
              {...register('id')}
              data-cy="card-id"
              className="block w-full p-1 px-2 text-gray-900 border border-gray-300 rounded text-md focus:bg-white focus:border-blue-500 focus:outline-none focus:shadow-outline disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
            {errors.id && <p className="m-1 text-sm text-red-500">{errors.id.message}</p>}
          </label>
        </div>
        <div className="w-full">
          <label className="block">
            <span className="block">Números:</span>
            <textarea
              {...register('cardNumbers')}
              rows={5}
              data-cy="card-numbers"
              className="block w-full p-1 px-2 text-gray-900 border border-gray-300 rounded text-md focus:bg-white focus:border-blue-500 focus:outline-none focus:shadow-outline disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
            {errors.cardNumbers && <p className="m-1 text-sm text-red-500">{errors.cardNumbers.message}</p>}
          </label>
        </div>
        <button
          type="submit"
          data-cy="add-card-submit"
          className="w-full p-2 my-2 leading-tight text-white bg-blue-500 border rounded shadow appearance-none hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Adicionar Cartela de Bingo
        </button>
      </form>
    </div>
  )
}

const createCardSchema = z.object({
  id: z
    .string({ required_error: 'Identificador é obrigatório' })
    .min(1, 'Valor deve ser maior que 1')
    .max(90, 'Valor deve ser menor que 90'),
  cardNumbers: z.string().superRefine((value, context) => {
    if (value.length === 0 || !value.includes(',')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deve incluir números separados por vírgula. Exemplo: 1,2,3,4,5...',
      })
    }
    const numbers = value.split(',')
    const invalidNumbers = numbers.filter((value) => {
      return new RegExp('[^0-9\r\n]+').test(value) || +value < 1 || +value > 90
    })
    if (invalidNumbers.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Números inválidos ${invalidNumbers.join(', ')}. Deve incluir números entre 1 e 90`,
      })
    }
    if (numbers.length !== 24) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Deve incluir 24 números separados por vírgula',
      })
    }
  }),
  rows: z.number().min(1).max(10),
  columns: z.number().min(1).max(10),
})

type CreateCardSchema = z.infer<typeof createCardSchema>
