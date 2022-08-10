import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'

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

export function Home() {
  const { register, handleSubmit, watch } = useForm()  // ele é um obj que tem varias funçoes/variaveis, eu posso desestruturar e extrair algumas variaveis e algumas funçoes daqui de dentro

  function handleCreateNewCycle( data: any ) { // aqui dentro eu posso receber o argumento 'data' que contem os dados dos nossos inputs do nosso formulário
    console.log(data)
  }

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
            { ...register('minutesAmout', { valueAsNumber: true })} // eu posso passar como segundo argumento um objeto de configurações
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