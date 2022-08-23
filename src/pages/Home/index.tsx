import { HandPalm, Play } from "phosphor-react";
import * as zod from 'zod'
import { 
  HomeContainer,
  StartCountDownButton, 
  StopCountDownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDown";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";

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

export function Home() {

 const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({ // passando um objeto de configuranções
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }

  })  // ele é um obj que tem varias funçoes/variaveis, eu posso desestruturar e extrair algumas variaveis e algumas funçoes daqui de dentro

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle( data: NewCycleFormData ) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task') // eu posso importar de dentro do use form uma função chamada watch para observar alguma coisa, aqui eu estou observando o meu campo 'task' e agora eu consigo saber o valor do meu campo em tempo real
  const isSubmitDisabled = !task // uma boa prática é colocar variaveis auxiliares, elas não alteram o meu código e não afetam a performance mas aumenta a legibilidade do código

  /*
    * prop Drilling => Quando a gente tem MUITAS propriedades APENAs para comunicação entrre componentes
    * Context API => Permite compartilharmos informaçoes entre VÁRIOS componentes ao mesmo tempo   
  */

  return(
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
            <StopCountDownButton onClick={interruptCurrentCycle} type="button"> 
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