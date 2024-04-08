import { useState } from 'react'
import { saveTask } from '../store/actions/board.actions'
import { TaskEditModal } from './TaskEditModal'
import { useSelector } from 'react-redux'

export function TaskStatus({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const [isOpenModal, setIsOpenModal] = useState(false)

  function getStatusBG(taskStatus) {
    const status = board.statuses?.find(s => s.title === taskStatus)
    return { backgroundColor: status?.color }
  }

  async function onUpdateTaskStatus(status) {
    const editedTask = { ...task, status }

    try {
      const savedBoard = await saveTask(board, group, editedTask)
      setIsOpenModal(false)
    } catch (err) {
      console.log('Had issues updating task status')
    }
  }

  return (
    <>
      <p
        onClick={() => setIsOpenModal(true)}
        style={getStatusBG(task.status || '')}
        className="task-status"
      >
        {task.status ? task.status : ''}
      </p>

      {isOpenModal && (
        <TaskEditModal arr={board.statuses} func={onUpdateTaskStatus} getStyle={getStatusBG} />
      )}
    </>
  )
}
