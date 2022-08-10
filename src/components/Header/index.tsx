import { HeaderContainer } from "./styles";
import { Timer, Scroll} from 'phosphor-react'
import logoIgnite from '../../assets/Logo-Ignite.svg'
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt=''/>
      <nav>
        <NavLink to="/" title="Timer"> {/* quando eu desejar colocar um link e estiver utiliando o react-router, ele vem com um comoponente chamado navlink que ao inves de ter o 'href' ele tem o 'to' como referencia*/}
          <Timer size={24}/>
        </NavLink>
        <NavLink to="history" title="Histórico">
          <Scroll size={24}/>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}