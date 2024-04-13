import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { HomeUpdates, WorkSpaceOption, Xbutton } from '../services/svg.service'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'
import { TaskConversation } from './TaskConversation'
import { showErrorMsg } from '../services/event-bus.service'
import { saveTask } from '../store/actions/board.actions'

export function UpdateLog() {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [selectedTask, setSelectedTask] = useState(null)
  const [taskGroup, setTaskGroup] = useState(null)
  const [activeView, setActiveView] = useState('updates')

  const taskLogRef = useRef()
  const navigate = useNavigate()
  const { taskId } = useParams()

  useEffect(() => {
    if (taskId) loadTask()
  }, [taskId])

  function loadTask() {
    const [taskGroup, task] = boardService.getTaskById(board, taskId)
    if (!task || !taskGroup) {
      console.log('Task activity -> Has issues with loading task')
      showErrorMsg('Could not load task details')
      return navigate('/board')
    }

    setSelectedTask(task)
    setTaskGroup(taskGroup)
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

  async function addMsg(task) {
    try {
      await saveTask(board, taskGroup, task)
    } catch (err) {
      console.log('could not save error', err)
    }
  }

  const taskPersons = selectedTask?.personsIds?.map(id => boardService.getPerson(board, id))

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
        {taskPersons &&
          !!taskPersons.length &&
          taskPersons.map(person => (
            <img key={person.id} src={`${person.imgUrl}`} alt={person.fullName} />
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

      <TaskConversation
        addMsg={addMsg}
        setSelectedTask={setSelectedTask}
        selectedTask={selectedTask}
      />
    </div>
  )
}
