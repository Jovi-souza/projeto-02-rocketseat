import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom' // importando

import { GlobalStyle } from './styles/Global'
import { defaultTheme } from './styles/themes/defaul'
import { CyclesContextProvider } from './contexts/CyclesContext'

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      
      <BrowserRouter> {/* eu tenho que envolver as rotas da minha aplicação com o BrowserRouter para que funcione*/}
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
