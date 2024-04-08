import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { DynamicLabelPicker } from './DynamicLabelPicker'
import { useSelector } from 'react-redux'

export function TaskStatus({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  function getStatusBG(taskStatus) {
    const status = board.statuses?.find(s => s.title === taskStatus)
    return { backgroundColor: status?.color }
  }

  async function onUpdateTaskStatus(status) {
    const editedTask = { ...task, status }

    try {
      await saveTask(board, group, editedTask)
    } catch (err) {
      console.log('Had issues updating task status')
    }
  }

  function handlePickerClick({ currentTarget }) {
    const cmpInfo = {
      type: 'labelPicker',
      options: board.statuses,
      submitFunc: onUpdateTaskStatus,
      styleFunc: getStatusBG,
    }

    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  return (
    <div
      onClick={handlePickerClick}
      style={getStatusBG(task.status || '')}
      className="task-row task-status"
    >
      {task.status ? task.status : ''}
    </div>
  )
}
