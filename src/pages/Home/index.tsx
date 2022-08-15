import { HandPalm, Play } from "phosphor-react";
import { useState } from "react";
import * as zod from 'zod'
import { 
  HomeContainer,
  StartCountDownButton, 
  StopCountDownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { createContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext( {} as CyclesContextType )

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
  .number()
  .min(5, 'o intervalo do ciclo precisa ser de no mínimo 5 minutos')
  .max(60, 'o intervalo do ciclo precisa ser de no maximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> // eu posso optar por utilizar a iteligencia do zod para pegar os typos do campo 

export function Home() {

  const[cycles, setCycles] = useState<Cycle[]>([])
  const[activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const[amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCycleFormData>({ // passando um objeto de configuranções
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }

  })  // ele é um obj que tem varias funçoes/variaveis, eu posso desestruturar e extrair algumas variaveis e algumas funçoes daqui de dentro

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId) 

  function setSecondsPassed( seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles( state => 
      state.map( (cycle) => {
        if ( cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

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

  const task = watch('task') // eu posso importar de dentro do use form uma função chamada watch para observar alguma coisa, aqui eu estou observando o meu campo 'task' e agora eu consigo saber o valor do meu campo em tempo real
  const isSubmitDisabled = !task // uma boa prática é colocar variaveis auxiliares, elas não alteram o meu código e não afetam a performance mas aumenta a legibilidade do código

  /*
    * prop Drilling => Quando a gente tem MUITAS propriedades APENAs para comunicação entrre componentes
    * Context API => Permite compartilharmos informaçoes entre VÁRIOS componentes ao mesmo tempo   
  */

  return(
    <CycleContext.Provider 
      value={{ 
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed 
      }}
    >
      <HomeContainer>
        <form 
          onSubmit={handleSubmit( handleCreateNewCycle )}   // dentro do meu onSubmit eu passo a minha função de submit, é estranho mas é assim que o react form funciona 
          action=""
        >

          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
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
    </CycleContext.Provider>
  )
}