import { defaultTheme } from './../styles/themes/defaul';
// esse arquivo é um arquivo de definição de tipos
import 'styled-components'

type ThemeType = typeof defaultTheme

declare module 'styled-components' { // está criando um tipagem pro modulo styled-components, toda vez que eu importar o styled components a tipagem é oq eu definir aqui dentro

  export interface DefaultTheme extends ThemeType{}

}