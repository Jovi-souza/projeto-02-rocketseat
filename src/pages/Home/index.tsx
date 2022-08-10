import { Play } from "phosphor-react";
import { useState } from "react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

// controlled / uncontrolled

// controlled = manter eem tempo real o estado/ informação que po ususario insere na nossa aplicação dentro de uma vaiavel/componente

export function Home() {
  const [task, setTask] = useState('')



  return(
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            list="task-sugestions"
            placeholder="Dê um nome para seu projeto"
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
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}