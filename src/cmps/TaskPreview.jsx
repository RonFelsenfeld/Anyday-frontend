import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ActiveMsg, MsgIcon, WorkSpaceOption } from '../services/svg.service'

import { useClickOutside } from '../customHooks/useClickOutside'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_RIGHT } from '../store/reducers/system.reducer'
import { SET_ACTIVE_TASK_ID } from '../store/reducers/board.reducer'

import { EditableText } from './EditableText'
import { TaskStatus } from './TaskStatus'
import { TaskPriority } from './TaskPriority'
import { TaskPerson } from './TaskPerson'
import { TaskTimeline } from './TaskTimeline'
import { TaskFiles } from './TaskFiles'

export function TaskPreview({ group, task, onSaveTask, onRemoveTask, setTaskToEdit }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const activeTaskId = useSelector(storeState => storeState.boardModule.activeTaskId)
  const taskPreviewRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useClickOutside(taskPreviewRef, () => dispatch({ type: SET_ACTIVE_TASK_ID, taskId: null }))

  function onTaskMenuClick({ currentTarget }) {
    const cmpInfo = {
      type: 'optionsMenu',
      options: [
        {
          title: 'Open task',
          icon: 'openTask',
          func: () => {
            navigate(`/board/${board._id}/task/${task.id}`)
          },
        },
        {
          title: 'Delete',
          icon: 'trash',
          func: () => {
            onRemoveTask(task.id)
          },
        },
        {
          title: 'Send as mail',
          icon: 'gmail',
          task,
        },
        {
          title: 'Add to calender',
          icon: 'calender',
          task,
        },
        {
          title: 'Share on Whatsapp',
          icon: 'whatsapp',
          task,
        },
      ],
    }

    showModal(currentTarget, BOTTOM_RIGHT, cmpInfo, false)
  }

  const activeClass = task.id === activeTaskId ? 'active' : ''

  return (
    <article
      ref={taskPreviewRef}
      onClick={() => dispatch({ type: SET_ACTIVE_TASK_ID, taskId: task.id })}
      className={`task-preview ${activeClass}`}
    >
      <button onClick={onTaskMenuClick} className="task-menu-btn">
        <WorkSpaceOption />
      </button>

      <div className={`sticky-container ${activeClass}`}>
        <div className="task-indicator" style={{ backgroundColor: group.style.color }}></div>

        <input type="checkbox" name="task" />
        <div
          onClick={() => {
            setTaskToEdit(task)
          }}
        >
          <EditableText
            className="edit-task"
            placeholder="+ Add task"
            func={onSaveTask}
            prevTxt={task.title}
          />
        </div>

        <Link to={`/board/${board._id}/task/${task.id}`}>
          <span className="task-row msg-btn">
            {task.comments?.length ? (
              <div className="activ-msg-container">
                <ActiveMsg />
                <span className="msg-num">{task.comments.length}</span>
              </div>
            ) : (
              <MsgIcon />
            )}
          </span>
        </Link>
      </div>

      <TaskPerson group={group} task={task} />
      <TaskStatus group={group} task={task} />
      <TaskPriority group={group} task={task} />
      <TaskTimeline group={group} task={task} />
      <TaskFiles group={group} task={task} />

      <div className="task-row add-new-col"></div>
    </article>
  )
}
