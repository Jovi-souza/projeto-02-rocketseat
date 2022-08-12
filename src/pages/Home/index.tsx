import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from "react";

import { 
  CountDownContainer, 
  FormContainer, 
  HomeContainer, 
  MinutesAmountInput, 
  Separator, 
  StartCountDownButton, 
  TaskInput 
} from "./styles";

// o register é uma função que retorna alguns metodos

/* 
  function register( name: string ) {
    return {
      onChange: () => void,
      onBlur: () => void,
      onFocus: () => void
    }
  }
*/

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'o intervalo do ciclo precisa ser de no mínimo 5 minutos')
  .max(60, 'o intervalo do ciclo precisa ser de no maximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // eu posso optar por utilizar a iteligencia do zod para pegar os typos do campo 

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {

  const[cycles, setCycles] = useState<Cycle[]>([])
  const[activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({ // passando um objeto de configuranções
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }

  })  // ele é um obj que tem varias funçoes/variaveis, eu posso desestruturar e extrair algumas variaveis e algumas funçoes daqui de dentro

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId) 

  useEffect( () => {
    if(activeCycle) {
      setInterval(() => {
        setAmountSecondsPassed( differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }
  }, [activeCycle])

  function handleCreateNewCycle( data: NewCycleFormData ) { // aqui dentro eu posso receber o argumento 'data' que contem os dados dos nossos inputs do nosso formulário
    const id = String(new Date().getTime()) // aqui tem uma forma muito interessante de se colocar m id

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles([...cycles, newCycle])
    setActiveCycleId(id)

    reset()
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  const task = watch('task') // eu posso importar de dentro do use form uma função chamada watch para observar alguma coisa, aqui eu estou observando o meu campo 'task' e agora eu consigo saber o valor do meu campo em tempo real
  const isSubmitDisabled = !task // uma boa prática é colocar variaveis auxiliares, elas não alteram o meu código e não afetam a performance mas aumenta a legibilidade do código

  return(
    <HomeContainer>
      <form 
        onSubmit={handleSubmit( handleCreateNewCycle )}  // dentro do meu onSubmit eu passo a minha função de submit, é estranho mas é assim que o react form funciona 
        action=""
      >
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-sugestions"
            placeholder="Dê um nome para seu projeto"
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
            { ...register('minutesAmount', { valueAsNumber: true })} // eu posso passar como segundo argumento um objeto de configurações
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>
        
        <StartCountDownButton 
          disabled={isSubmitDisabled} 
          type="submit"
        > 
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}