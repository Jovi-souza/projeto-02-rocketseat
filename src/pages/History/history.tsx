import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  return(
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 messes</td>
              <Status statusColor='green'>concluído</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 messes</td>
              <Status statusColor='yellow'>Em andamento</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 messes</td>
              <Status statusColor='red'>Interrompido</Status>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 2 messes</td>
              <Status statusColor='green'>concluído</Status>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}