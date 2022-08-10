import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Outlet /> 
      {/* o outlet é um espaço para ser inserido um conteudo, quando ele estiver usando este layout com o outlet ele vai saber exatamente onde ele tem que posicionar o conteudo expecifico de cada pagina */}
    </LayoutContainer>
  )
}