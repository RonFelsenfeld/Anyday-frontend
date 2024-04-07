import { MsgIcon, WorkSpaceOption } from '../services/svg.service'
import { EditableText } from './EditableText'
import { TaskStatus } from './TaskStatus'
import { TaskPriority } from './TaskPriority'
import { TaskPerson } from './TaskPerson'
import { TaskTimeline } from './TaskTimeline'

export function TaskPreview({
  board,
  group,
  task,
  onRemoveTask,
  taskToEdit,
  setTaskToEdit,
  onSaveTask,
  isUpdateLogExpanded,
  setIsUpdateLogExpanded,
  setSelectedTask,
  setBoard
}) {

  function onOpenUpdateLog(task) {
    setIsUpdateLogExpanded(true)
    setSelectedTask(task)
  }

  function getFileType() { }

  return (
    <article className='task-preview'>

      <button onClick={() => onRemoveTask(task.id)} className='task-menu-btn'><WorkSpaceOption /></button>

      <div className="sticky-container">
        <input type="checkbox" name="task" />
        <div onClick={() => {
          setTaskToEdit(task)
        }} >
          <EditableText
            className="edit-task"
            placeholder='+ Add task'
            func={onSaveTask}
            prevTxt={task.title}
          />
        </div>
        <p className="msg-btn" onClick={() => onOpenUpdateLog(task)}><MsgIcon /></p>
      </div>

      <TaskPerson board={board} setBoard={setBoard} group={group} task={task} />
      <TaskStatus board={board} setBoard={setBoard} group={group} task={task} />
      <TaskPriority board={board} setBoard={setBoard} group={group} task={task} />
      <TaskTimeline board={board} setBoard={setBoard} group={group} task={task} />

      <p className="task-files">{task.files ? getFileType() : ''}</p>

    </article>
  )
}
