import React, { useState } from 'react'
import { boardService } from '../services/board.service'
import { MsgIcon, WorkSpaceOption } from '../services/svg.service'
import { EditableText } from './EditableText'
import { TaskEditModal } from './TaskEditModal'
import { saveTask } from '../store/actions/board.actions'
import { TaskStatus } from './TaskStatus'
import { TaskPriority } from './TaskPriority'

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

  function getFormattedTimeline(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1)
    const date2 = new Date(timestamp2)

    const day1 = date1.getDate()
    const day2 = date2.getDate()
    const month2 = date2.toLocaleString('default', { month: 'short' })

    const formattedDateRange = `${day1} - ${day2} ${month2}`
    return formattedDateRange
  }

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

      <p className="task-persons-img">
        {task.personsIds
          ? task.personsIds.map(id => (
            <img key={id} src={`${boardService.getPersonUrl(board, id)}`} alt="" />
          ))
          : ''}
      </p>
      <TaskStatus board={board} setBoard={setBoard} group={group} task={task} />
      <TaskPriority board={board} setBoard={setBoard} group={group} task={task} />
      <p className="task-timeline">
        {task.timeline ? getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate) : '-'}
      </p>
      <p className="task-files">{task.files ? getFileType() : ''}</p>
    </article>
  )
}
