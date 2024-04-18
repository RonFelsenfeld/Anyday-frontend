import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { HomeUpdates, WorkSpaceOption, Xbutton } from '../services/svg.service'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'
import { TaskConversation } from './TaskConversation'
import { showErrorMsg } from '../services/event-bus.service'
import { saveTask } from '../store/actions/board.actions'
import { ActivityLogView } from './ActivityLogView'
import { FilesLog } from './FilesLog'
import {
  SOCKET_EMIT_ADD_COMMENT,
  SOCKET_EMIT_SET_TASK,
  SOCKET_EVENT_COMMENT_ADDED,
  socketService,
} from '../services/socket-service'

export function UpdateLog() {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)

  const [selectedTask, setSelectedTask] = useState(null)
  const [taskGroup, setTaskGroup] = useState(null)
  const [activeView, setActiveView] = useState('updates')

  const taskLogRef = useRef()
  const navigate = useNavigate()
  const { taskId } = useParams()

  useEffect(() => {
    if (taskId) loadTask()
    socketService.emit(SOCKET_EMIT_SET_TASK, selectedTask)
    socketService.on(SOCKET_EVENT_COMMENT_ADDED, setSelectedTask)

    return () => socketService.off(SOCKET_EMIT_SET_TASK)
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
    console.log('task', task)
    try {
      await saveTask(board, taskGroup, task)
      socketService.emit(SOCKET_EMIT_ADD_COMMENT, task)
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
        {taskPersons && taskPersons.length > 2 && (
          <>
            {taskPersons[0].imgUrl ? (
              <>
                <img
                  key={taskPersons[0].id}
                  src={taskPersons[0].imgUrl}
                  alt={taskPersons[0].fullName}
                />
              </>
            ) : (
              <div key={taskPersons[0].id} className="person-initials">
                {utilService.getInitials(taskPersons[0].fullName)}
              </div>
            )}
            <span className="person-count">+{taskPersons.length - 1}</span>
          </>
        )}

        {taskPersons &&
          !!taskPersons.length &&
          taskPersons.length <= 2 &&
          taskPersons.map(person => {
            if (person.imgUrl) {
              return <img key={person.id} src={`${person.imgUrl}`} alt={person.fullName} />
            } else {
              return (
                <div className="person-initials">{utilService.getInitials(person.fullName)}</div>
              )
            }
          })}

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
      {activeView === 'updates' && (
        <TaskConversation
          addMsg={addMsg}
          setSelectedTask={setSelectedTask}
          selectedTask={selectedTask}
        />
      )}

      {activeView === 'activity' && (
        <ActivityLogView board={board} selectedTask={selectedTask} taskGroup={taskGroup} />
      )}
      {activeView === 'files' && <FilesLog selectedTask={selectedTask} />}
    </div>
  )
}
