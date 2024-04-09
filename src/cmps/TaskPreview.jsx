import { MsgIcon, WorkSpaceOption } from '../services/svg.service'

import { EditableText } from './EditableText'
import { TaskStatus } from './TaskStatus'
import { TaskPriority } from './TaskPriority'
import { TaskPerson } from './TaskPerson'
import { TaskTimeline } from './TaskTimeline'

export function TaskPreview({
  group,
  task,
  onSaveTask,
  onRemoveTask,
  setTaskToEdit,
  setIsUpdateLogExpanded,
  setSelectedTask,
}) {
  function onOpenUpdateLog(task) {
    setIsUpdateLogExpanded(true)
    setSelectedTask(task)
  }

  function getFileType() {}

  return (
    <article className="task-preview">
      <button onClick={() => onRemoveTask(task.id)} className="task-menu-btn">
        <WorkSpaceOption />
      </button>

      <div className="sticky-container">
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
        <div className="task-row msg-btn" onClick={() => onOpenUpdateLog(task)}>
          <MsgIcon />
        </div>
      </div>

      <TaskPerson group={group} task={task} />
      <TaskStatus group={group} task={task} />
      <TaskPriority group={group} task={task} />
      <TaskTimeline group={group} task={task} />

      <div className="task-row task-files">{task.files ? getFileType() : ''}</div>
      <div className='task-row add-new-col'></div>
    </article>
  )
}
