import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";

import { 
  HomeContainer,
  StartCountDownButton, 
  StopCountDownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";

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

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {

  const[cycles, setCycles] = useState<Cycle[]>([])
  const[activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId) 

  function handleCreateNewCycle( data: NewCycleFormData ) { // aqui dentro eu posso receber o argumento 'data' que contem os dados dos nossos inputs do nosso formulário
    const id = String(new Date().getTime()) // aqui tem uma forma muito interessante de se colocar m id

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {

    setCycles( state => state.map( (cycle) => {
      if ( cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null)
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  useEffect( () => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle]) 

  const task = watch('task') // eu posso importar de dentro do use form uma função chamada watch para observar alguma coisa, aqui eu estou observando o meu campo 'task' e agora eu consigo saber o valor do meu campo em tempo real
  const isSubmitDisabled = !task // uma boa prática é colocar variaveis auxiliares, elas não alteram o meu código e não afetam a performance mas aumenta a legibilidade do código

  /*
    * prop Drilling => Quando a gente tem MUITAS propriedades APENAs para comunicação entrre componentes
    * Context API => Permite compartilharmos informaçoes entre VÁRIOS componentes ao mesmo tempo   
  */

  return(
    <HomeContainer>
      <form 
        onSubmit={handleSubmit( handleCreateNewCycle )}  // dentro do meu onSubmit eu passo a minha função de submit, é estranho mas é assim que o react form funciona 
        action=""
      >

        <NewCycleForm />
        <CountDown />
        
        { activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button"> 
          <HandPalm size={24}/>
          Interromper
        </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit"> 
          <Play size={24}/>
          Começar
        </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}