import { useSelector } from 'react-redux'
import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { utilService } from '../services/util.service'

export function TaskPriority({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }

  function getPriorityBG(taskPriority) {
    const priority = board.priorities?.find(p => p.title === taskPriority)
    return { backgroundColor: priority?.color }
  }

  async function onUpdateTaskPriority(priority) {
    const currActivity = {
      id: utilService.makeId(),
      byPerson: user || guest,
      action: `Changed priority to ${priority}`,
      createdAt: Date.now(),
    }

    const activities = task.activities ? [...task.activities, currActivity] : [currActivity]
    const editedTask = { ...task, priority, activities }
    if (!priority) delete editedTask.priority

    try {
      await saveTask(board, group, editedTask)
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
