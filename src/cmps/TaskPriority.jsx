import { useState } from 'react'
import { TaskEditModal } from './TaskEditModal'
import { saveTask } from '../store/actions/board.actions'

export function TaskPriority({ board, setBoard, group, task }) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  function getPriorityBG(taskPriority) {
    const priority = board.priorities?.find(p => p.title === taskPriority)
    return { backgroundColor: priority?.color }
  }

  async function onUpdateTaskPriority(priority) {
    const editedTask = { ...task, priority }

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
        style={getPriorityBG(task?.priority || '')}
        className="task-row task-priority"
      >
        {task?.priority ? task.priority : ''}
      </div>

      {isOpenModal && (
        <TaskEditModal
          arr={board.priorities}
          func={onUpdateTaskPriority}
          getStyle={getPriorityBG}
        />
      )}
    </>
  )
}
