import { FormContainer, TaskInput, MinutesAmountInput} from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function NewCycleForm() {

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(1, 'o intervalo do ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'o intervalo do ciclo precisa ser de no maximo 60 minutos')
  })
  
  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // eu posso optar por utilizar a iteligencia do zod para pegar os typos do campo 

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({ // passando um objeto de configuranções
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }

  })  // ele é um obj que tem varias funçoes/variaveis, eu posso desestruturar e extrair algumas variaveis e algumas funçoes daqui de dentro

  return(
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        id="task" 
        list="task-sugestions"
        placeholder="Dê um nome para seu projeto"
        disabled={!!activeCycle}
        {...register('task')} // eu usa a syntax de spreed operator para basicamente trnsformar cada um dos metodos do retorno da função register em uma propriedade e em seguida eu coloco um name no meu input
      />

      <datalist id="task-sugestions"> 
        <option value="Projeto 1"/>
        <option value="Projeto 2"/>
        <option value="Projeto 3"/>
        <option value="banana"/>
      </datalist>

      <label htmlFor="miutesAmount">durante</label>
      <MinutesAmountInput 
        type="number" 
        id="miutesAmount" 
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        { ...register('minutesAmount', { valueAsNumber: true })} // eu posso passar como segundo argumento um objeto de configurações
      />

      <span>minutos.</span>
      </FormContainer>
  )
}