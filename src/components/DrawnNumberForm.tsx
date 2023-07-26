import { useForm } from 'react-hook-form'

type DrawNumberFormProps = {
  onSuccess: (data: any) => void
}

export const DrawnNumberForm = ({ onSuccess }: DrawNumberFormProps) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      number: null,
    },
  })

  const onSubmit = async (data: any) => {
    onSuccess(+data.number)
    reset()
  }

  return (
    <div className="flex flex-col w-1/2">
      <h3>Adicionar Número Sorteado</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between gap-2 md:flex-col md:items-start"
      >
        <div className="flex items-center justify-between gap-2 md:w-full">
          <label className="block font-bold">Número:</label>
          <input
            type="number"
            {...register('number')}
            data-cy="drawn-number-input"
            className="w-16 p-2 leading-tight text-gray-500 border rounded shadow appearance-none focus:outline-none focus:shadow-outline md:w-full "
          />
        </div>
        <button
          type="submit"
          data-cy="drawn-number-submit"
          className="p-2 leading-tight text-white bg-blue-500 border rounded shadow appearance-none hover:bg-blue-700 focus:outline-none focus:shadow-outline md:w-full"
        >
          Adicionar Sorteado
        </button>
      </form>
    </div>
  )
}
