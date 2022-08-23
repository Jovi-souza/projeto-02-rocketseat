import { FormContainer, TaskInput, MinutesAmountInput} from './styles'
import { useContext } from 'react'
import { CycleContext } from '../../../../contexts/CyclesContext'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

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
        min={5}
        max={60}
        disabled={!!activeCycle}
        { ...register('minutesAmount', { valueAsNumber: true })} // eu posso passar como segundo argumento um objeto de configurações
      />

      <span>minutos.</span>
      </FormContainer>
  )
}