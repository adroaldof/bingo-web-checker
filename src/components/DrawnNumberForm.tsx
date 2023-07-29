import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type DrawNumberFormProps = {
  onSuccess: (data: any) => void
}

export const DrawnNumberForm = ({ onSuccess }: DrawNumberFormProps) => {
  const { handleSubmit, register, reset, setFocus, formState } = useForm<DrawnNumberSchema>({
    resolver: zodResolver(drawnNumberSchema),
    defaultValues: {
      number: null,
    },
  })

  const { errors } = formState

  const onSubmit = async (data: any) => {
    onSuccess(+data.number)
    reset()
    setFocus('number')
  }

  useEffect(() => {
    setFocus('number')
  }, [setFocus])

  return (
    <div className="w-full p-4 bg-slate-200">
      <h3>Adicionar Número Sorteado</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between gap-2">
        <div className="w-full">
          <label className="block">
            <span className="block">Número:</span>
            <input
              type="number"
              {...register('number', { valueAsNumber: true })}
              data-cy="drawn-number-input"
              className="block w-full p-1 px-2 text-lg text-gray-900 border border-gray-300 rounded focus:bg-white focus:border-blue-500 focus:outline-none focus:shadow-outline disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            />
            {errors.number && <p className="m-1 text-sm text-red-500">{errors.number.message}</p>}
          </label>
        </div>
        <button
          type="submit"
          data-cy="drawn-number-submit"
          className="w-full p-2 leading-tight text-white bg-blue-500 border rounded shadow appearance-none hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Adicionar Sorteado
        </button>
      </form>
    </div>
  )
}

const drawnNumberSchema = z.object({
  number: z
    .number({ required_error: 'Número sorteado é obrigatório' })
    .gte(1, 'Valor mínimo deve ser maior que 1')
    .lte(90, 'Valor máximo deve ser menor que 90'),
})

type DrawnNumberSchema = z.infer<typeof drawnNumberSchema> | { number?: number | null }
