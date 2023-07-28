import { main } from '@/business/main'
import { useForm } from 'react-hook-form'

type CreateCardFormProps = {
  onSuccess: (data: any) => void
}

export const CreateCardForm = ({ onSuccess }: CreateCardFormProps) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      id: '',
      cardNumbers: '',
      rows: 5,
      columns: 5,
    },
  })

  const onSubmit = (data: any) => {
    const card = main.card.createCard.execute(data)
    onSuccess(card)
    reset()
  }

  return (
    <div className="flex flex-col w-full">
      <h3>Adicionar Cartela</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-2 md:flex-col md:items-start"
      >
        <div className="flex items-center justify-between gap-2 md:w-full">
          <label className="block font-bold">ID:</label>
          <input
            type="text"
            {...register('id')}
            data-cy="card-id"
            className="p-2 leading-tight text-gray-500 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between gap-2 md:w-full">
          <label className="block font-bold">Números</label>
          <textarea
            {...register('cardNumbers')}
            rows={5}
            data-cy="card-numbers"
            className="p-2 leading-tight text-gray-500 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
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
