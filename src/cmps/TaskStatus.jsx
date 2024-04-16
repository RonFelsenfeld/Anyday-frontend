import { useRef } from 'react'
import { useSelector } from 'react-redux'

import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { utilService } from '../services/util.service'

export function TaskStatus({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }

  const statusPreviewRef = useRef()

  function getStatusBG(taskStatus) {
    const status = board.statuses?.find(s => s.title === taskStatus)
    return { backgroundColor: status?.color }
  }

  async function onUpdateTaskStatus(status) {
    const currActivity = {
      id: utilService.makeId(),
      byPerson: user || guest,
      action: `Changed status to ${status}`,
      createdAt: Date.now(),
    }
    const activities = task.activities ? [...task.activities, currActivity] : [currActivity]
    const editedTask = { ...task, status, activities }
    if (!status) delete editedTask.status
    
    try {
      await saveTask(board, group, editedTask)
      if (status === 'Done') animateStatus()
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
      ref={statusPreviewRef}
    >
      {task.status ? task.status : ''}
    </div>
  )
}
