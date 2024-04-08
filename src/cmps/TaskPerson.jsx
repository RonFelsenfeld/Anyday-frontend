import { useState } from 'react'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { PersonEditModal } from './PersonEditModal'

export function TaskPerson({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const [isOpenModal, setIsOpenModal] = useState(false)

  function getPriorityBG() {
    return { color: 'black' }
  }

  async function onUpdateTaskPersons(persons) {
    const editedTask = { ...task, persons }

    try {
      const savedBoard = await saveTask(board, group, editedTask)
      setBoard(savedBoard)
      setIsOpenModal(false)
    } catch (err) {
      console.log('Had issues updating task persons')
    }
  }

  const persons = board.persons.map(({ id, fullName }) => ({ id, title: fullName }))

  return (
    <div className="task-row task-persons-img">
      <button
        onClick={() => setIsOpenModal(true)}
        className="add-person-btn fa-solid plus"
      ></button>
      <div className="img-container">
        {task.personsIds ? (
          task.personsIds.map(id => (
            <img key={id} src={`${boardService.getPersonUrl(board, id)}`} alt="" />
          ))
        ) : (
          <img src={`https://cdn.monday.com/icons/dapulse-person-column.svg`} alt="person-icon" />
        )}
      </div>

      {isOpenModal && <PersonEditModal />}
    </div>
  )
}
