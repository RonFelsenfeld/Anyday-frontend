import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { HomeUpdates, WorkSpaceOption, Xbutton } from '../services/svg.service'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'

export function UpdateLog() {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [selectedTask, setSelectedTask] = useState(null)
  const [activeView, setActiveView] = useState('updates')

  const taskLogRef = useRef()
  const navigate = useNavigate()
  const { taskId } = useParams()

  useEffect(() => {
    if (taskId) loadTask()
  }, [])

  async function loadTask() {
    try {
      const task = await boardService.getTaskById(board, taskId)
      setSelectedTask(task)
    } catch (err) {
      console.log('Task activity -> Has issues with loading task')
    }
  }

  function handleCloseTaskLog() {
    utilService.animateCSS(taskLogRef.current, 'slideOutRight')

    setTimeout(() => {
      navigate(`/board/${board._id}/`)
    }, 100)
  }

  function getIsActiveClass(view) {
    if (view === activeView) return 'active'
    return ''
  }

  if (!selectedTask) return
  return (
    <div
      ref={taskLogRef}
      className={`update-log-container animate__animated animate__slideInRight`}
    >
      <div className="exit-button-container flex">
        <button onClick={handleCloseTaskLog}>
          <Xbutton />
        </button>
      </div>

      <div className="title">
        <h2>{selectedTask.title}</h2>
      </div>

      <div className="img-options flex align-center">
        {selectedTask.personsIds &&
          !!selectedTask.personsIds.length &&
          selectedTask.personsIds.map(id => (
            <img key={id} src={`${boardService.getPersonUrl(board, id)}`} alt="" />
          ))}

        <div>
          <button className="menu-options-btn">
            <WorkSpaceOption />
          </button>
        </div>
      </div>

      <div className="menu-options flex align-center">
        <button
          className={`btn-view updates-option flex align-center ${getIsActiveClass('updates')}`}
          onClick={() => setActiveView('updates')}
        >
          <HomeUpdates />
          <span className="updates">Updates</span>
        </button>

        <button
          className={`btn-view files-option ${getIsActiveClass('files')}`}
          onClick={() => setActiveView('files')}
        >
          <span>Files</span>
        </button>

        <button
          className={`btn-view activity-log-option ${getIsActiveClass('activity')}`}
          onClick={() => setActiveView('activity')}
        >
          <span>Activity Log</span>
        </button>
      </div>
      <div className="update-log-content">
        <div className="updates-log-txt-area">
          <input className="txt-input-update-log" type="text" placeholder="Write an update..." />
        </div>
      </div>
    </div>
  )
}
