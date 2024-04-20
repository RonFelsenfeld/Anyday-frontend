import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { SET_LABEL_IN_EDITING } from '../store/reducers/board.reducer'
import { utilService } from '../services/util.service'

export function TaskPriority({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const labelInEditing = useSelector(storeState => storeState.boardModule.labelInEditing)

  const dispatch = useDispatch()
  const [openStatusModal, setOpenStatusModal] = useState(null)

  const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }

  useEffect(() => {
    if (
      openStatusModal &&
      labelInEditing.taskId === task.id &&
      labelInEditing.labelType === 'priority'
    ) {
      handlePickerClick(openStatusModal)
    }
  }, [board.priorities])

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
      to: getPriority(id),
    }

    const activities = task.activities ? [...task.activities, currActivity] : [currActivity]
    const editedTask = { ...task, priority: id, activities }
    const groupToSave = board.groups.find(g => g.id === group.id)

    setOpenStatusModal(null)
    try {
      await saveTask(board, groupToSave, editedTask)
    } catch (err) {
      console.log('Had issues updating task status')
    }
  }

  function handlePickerClick({ currentTarget }) {
    setOpenStatusModal({ currentTarget })
    dispatch({ type: SET_LABEL_IN_EDITING, taskId: task.id, labelType: 'priority' })

    const cmpInfo = {
      type: 'labelPicker',
      options: board.priorities,
      submitFunc: onUpdateTaskPriority,
      styleFunc: getPriorityBG,
      from: 'priorities',
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
