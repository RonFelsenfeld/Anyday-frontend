import { useRef } from 'react'
import { Link } from 'react-router-dom'

import { MsgIcon, WorkSpaceOption } from '../services/svg.service'

import { EditableText } from './EditableText'
import { TaskStatus } from './TaskStatus'
import { TaskPriority } from './TaskPriority'
import { TaskPerson } from './TaskPerson'
import { TaskTimeline } from './TaskTimeline'
import { useSelector } from 'react-redux'
import { useClickOutside } from '../customHooks/useClickOutside'

export function TaskPreview({
  group,
  task,
  onSaveTask,
  onRemoveTask,
  setTaskToEdit,
  activeTaskId,
  setActiveTaskId,
}) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const taskPreviewRef = useRef()

  useClickOutside(taskPreviewRef, () => setActiveTaskId(null))

  function getFileType() {}

  const activeClass = task.id === activeTaskId ? 'active' : ''

  return (
    <article
      ref={taskPreviewRef}
      onClick={() => setActiveTaskId(task.id)}
      className={`task-preview ${activeClass}`}
    >
      <button onClick={() => onRemoveTask(task.id)} className="task-menu-btn">
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
            <MsgIcon />
          </span>
        </Link>
      </div>

      <TaskPerson group={group} task={task} />
      <TaskStatus group={group} task={task} />
      <TaskPriority group={group} task={task} />
      <TaskTimeline group={group} task={task} />

      <div className="task-row task-files">{task.files ? getFileType() : ''}</div>
      <div className="task-row add-new-col"></div>
    </article>
  )
}
