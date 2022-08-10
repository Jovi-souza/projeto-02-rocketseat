import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History/history'
import { Home } from './pages/Home'

export function Router() {
  return(
    <Routes>
      <Route path='/' element={ <DefaultLayout/> }> {/*  no path se passa uma barra pq nós queremos aplicar esse DefaultElement em todas as rotas */}
      
        <Route path='/' element={ <Home/> }/> {/* a primeira propriedade que eu passo é o primeiro caminho que o usuario ira seguir e o segundo parametro é qual elemento será renderizado nessa tela{ que nesse caso será a page HOME } */}
        <Route path='/history' element={ <History/> }/> {/* sempre lemrando que uma rota é filha da outra */}
      </Route>
    </Routes>
  )
}