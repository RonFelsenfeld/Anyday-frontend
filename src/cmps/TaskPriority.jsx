import { useSelector } from 'react-redux'
import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { utilService } from '../services/util.service'

export function TaskPriority({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }

  function getPriority(priorityId = task.priority) {
    return board.priorities?.find(p => p.id === priorityId)
  }

  const { title, color } = getPriority() || ''

  function getPriorityBG(priorityId) {
    const priority = board.priorities?.find(p => p.id === priorityId)
    return { backgroundColor: priority?.color }
  }

  async function onUpdateTaskPriority({ id }) {
    const currActivity = {
      id: utilService.makeId(),
      byPerson: user || guest,
      action: 'Priority',
      createdAt: Date.now(),
      from: getPriority(task.priority),
      to: getPriority(id)
    }

    const activities = task.activities ? [...task.activities, currActivity] : [currActivity]
    const editedTask = { ...task, priority: id, activities }
    // if (!priority) delete editedTask.priority

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
      style={{ backgroundColor: color ? color : '' }}
      className="task-row task-priority"
    >
      {title}
    </div>
  )
}
