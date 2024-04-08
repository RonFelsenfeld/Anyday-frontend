import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { hideModal, showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { saveTask } from '../store/actions/board.actions'

export function TaskPerson({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  async function onAddPerson(personId) {
    const editedTask = task.personsIds
      ? { ...task, personsIds: [...task.personsIds, personId] }
      : { ...task, personsIds: [personId] }

    try {
      await saveTask(board, group, editedTask)
      hideModal()
    } catch (err) {
      console.log('Had issues updating task persons', err)
    }
  }

  async function onRemovePerson(personId) {
    const editedTask = { ...task, personsIds: task.personsIds.filter(id => id !== personId) }

    try {
      await saveTask(board, group, editedTask)
      hideModal()
    } catch (err) {
      console.log('Had issues updating task persons', err)
    }
  }

  const taskPersons = task.personsIds?.map(id => boardService.getPerson(board, id))

  const suggestedPersons = board.persons.filter(person => !task.personsIds?.includes(person.id))

  function handlePickerClick({ currentTarget }) {
    const cmpInfo = {
      type: 'personPicker',
      taskPersons,
      suggestedPersons,
      onAddPerson,
      onRemovePerson,
    }

    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  return (
    <div onClick={handlePickerClick} className="task-row task-persons-img">
      <button className="add-person-btn fa-solid plus"></button>
      {(!taskPersons || !taskPersons.length) && (
        <img src={`https://cdn.monday.com/icons/dapulse-person-column.svg`} alt="person-icon" />
      )}
      {taskPersons && taskPersons.length > 2 && (
        <>
          <img key={taskPersons[0].id} src={taskPersons[0].imgUrl} alt={taskPersons[0].fullName} />
          <span className="person-count">+{taskPersons.length - 1}</span>
        </>
      )}
      {taskPersons &&
        taskPersons.length <= 2 &&
        taskPersons.map(person => (
          <img key={person.id} src={person.imgUrl} alt={person.fullName} />
        ))}
    </div>
  )
}
