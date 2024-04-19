import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { SET_LABEL_IN_EDITING } from '../store/reducers/board.reducer'
import { utilService } from '../services/util.service'

export function TaskStatus({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const labelInEditing = useSelector(storeState => storeState.boardModule.labelInEditing)

  const statusPreviewRef = useRef()
  const [openStatusModal, setOpenStatusModal] = useState(null)
  const dispatch = useDispatch()

  const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }

  useEffect(() => {
    if (openStatusModal &&
      labelInEditing.taskId === task.id &&
      labelInEditing.labelType === 'status') handlePickerClick(openStatusModal)
  }, [board.statuses])

  function getStatus(statusId = task.status) {
    return board.statuses.find(s => s.id === statusId)
  }

  const { title, color } = getStatus() || ''

  function getStatusBG(statusId) {
    const status = board.statuses?.find(s => s.id === statusId)
    return { backgroundColor: status?.color }
  }

  async function onUpdateTaskStatus({ id }) {
    const toStatus = getStatus()

    const currActivity = {
      id: utilService.makeId(),
      byPerson: user || guest,
      action: `Status`,
      createdAt: Date.now(),
      from: getStatus(task.status),
      to: getStatus(id)
    }
    const activities = task.activities ? [...task.activities, currActivity] : [currActivity]
    const editedTask = { ...task, status: id, activities }

    setOpenStatusModal(null)

    try {
      await saveTask(board, group, editedTask)
      if (id === 's101') animateStatus()
    } catch (err) {
      console.log('Had issues updating task status')
    }
  }

  function animateStatus() {
    const animationClasses = ['confetti', 'balloon', 'crazy-balls']
    const rndIdx = utilService.getRandomIntInclusive(0, animationClasses.length - 1)
    const rndAnimation = animationClasses[rndIdx]
    statusPreviewRef.current.classList.add(rndAnimation)

    setTimeout(() => {
      statusPreviewRef.current.classList.remove(rndAnimation)
    }, 3000)
  }

  function handlePickerClick({ currentTarget }) {
    setOpenStatusModal({ currentTarget })
    dispatch({ type: SET_LABEL_IN_EDITING, taskId: task.id, labelType: 'status' })

    const cmpInfo = {
      type: 'labelPicker',
      options: board.statuses,
      submitFunc: onUpdateTaskStatus,
      styleFunc: getStatusBG,
      from: 'statuses'
    }

    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  return (
    <div
      onClick={handlePickerClick}
      style={{ backgroundColor: color ? color : '' }}
      className="task-row task-status"
      ref={statusPreviewRef}
    >
      {title}
    </div>
  )
}
