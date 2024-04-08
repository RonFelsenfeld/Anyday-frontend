import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'

export function TaskPerson({ task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  return (
    <p className="task-persons-img">
      {task.personsIds ? (
        task.personsIds.map(id => (
          <img key={id} src={`${boardService.getPersonUrl(board, id)}`} alt="" />
        ))
      ) : (
        <img src={`https://cdn.monday.com/icons/dapulse-person-column.svg`} alt="person-icon" />
      )}
    </p>
  )
}
