import { useState } from 'react'
import { saveTask } from '../store/actions/board.actions'
import { TaskEditModal } from './TaskEditModal'

export function TaskStatus({ board, setBoard, group, task }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  function getStatusBG(taskStatus) {
    const status = board.statuses?.find(s => s.title === taskStatus)
    return { backgroundColor: status?.color }
  }

  async function onUpdateTaskStatus(status) {
    const editedTask = { ...task, status }

    try {
      const savedBoard = await saveTask(board, group, editedTask)
      setBoard(savedBoard)
      setIsOpenModal(false)
    } catch (err) {
      console.log('Had issues updating task status')
    }
  }

  return (
    <>
      <div
        onClick={() => setIsOpenModal(true)}
        style={getStatusBG(task.status || '')}
        className="task-row task-status"
      >
        {task.status ? task.status : ''}
      </div>

      {isOpenModal && (
        <TaskEditModal arr={board.statuses} func={onUpdateTaskStatus} getStyle={getStatusBG} />
      )}
    </>
  )
}
