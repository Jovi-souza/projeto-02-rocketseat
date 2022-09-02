import { createContext, ReactNode, useReducer, useState } from "react"
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../Reducers/cycles/action"
import { Cycle, cyclesReducer } from "../Reducers/cycles/reducer"

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CycleContext = createContext( {} as CyclesContextType )

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ 
  children
 }: CyclesContextProviderProps ) {
  const[cyclesState, dispatch] = useReducer( cyclesReducer, {
    cycles: [],
    activeCycleId: null
  })

  const[amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId) 

  function setSecondsPassed( seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch( markCurrentCycleAsFinishedAction() )
  }

  function createNewCycle( data: CreateCycleData ) { // aqui dentro eu posso receber o argumento 'data' que contem os dados dos nossos inputs do nosso formulário
    const id = String(new Date().getTime()) // aqui tem uma forma muito interessante de se colocar m id

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    dispatch( addNewCycleAction(newCycle) )
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch( interruptCurrentCycleAction() )
  }

  return (
    <CycleContext.Provider 
      value={{
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}