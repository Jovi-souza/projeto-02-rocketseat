import { createContext, ReactNode, useState } from "react"

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

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

export function CyclesContextProvider({ children }: CyclesContextProviderProps ) {
  const[cycles, setCycles] = useState<Cycle[]>([])
  const[activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const[amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  function createNewCycle( data: CreateCycleData ) { // aqui dentro eu posso receber o argumento 'data' que contem os dados dos nossos inputs do nosso formulário
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
  }

  function interruptCurrentCycle() {

    setCycles( state => state.map( (cycle) => {
      if ( cycle.id === activeCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))
    setActiveCycleId(null)
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