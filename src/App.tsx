import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom' // importando

import { GlobalStyle } from './styles/Global'
import { defaultTheme } from './styles/themes/defaul'

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      
      <BrowserRouter> {/* eu tenho que envolver as rotas da minha aplicação com o BrowserRouter para que funcione*/}
        <Router />
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
