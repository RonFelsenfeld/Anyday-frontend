import { useSelector } from 'react-redux'
import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'

export function TaskPriority({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  function getPriorityBG(taskPriority) {
    const priority = board.priorities?.find(p => p.title === taskPriority)
    return { backgroundColor: priority?.color }
  }

  async function onUpdateTaskPriority(priority) {
    const editedTask = { ...task, priority }

    try {
      const savedBoard = await saveTask(board, group, editedTask)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues updating task status')
    }
  }

  function handlePickerClick({ currentTarget }) {
    const cmpInfo = {
      type: 'labelPicker',
      options: board.priorities,
      submitFunc: onUpdateTaskPriority,
      styleFunc: getPriorityBG,
    }

    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  return (
    <div
      onClick={handlePickerClick}
      style={getPriorityBG(task?.priority || '')}
      className="task-row task-priority"
    >
      {task?.priority ? task.priority : ''}
    </div>
  )
}
