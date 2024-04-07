import React, { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { boardService } from '../services/board.service'
import { MsgIcon, WorkSpaceOption } from '../services/svg.service'
import { itemTypes } from '../dragTypes'

import { EditableText } from './EditableText'
import { Link } from 'react-router-dom'

export function TaskPreview({
  board,
  group,
  task,
  taskIdx,
  onRemoveTask,
  taskToEdit,
  setTaskToEdit,
  onSaveTask,
  isUpdateLogExpanded,
  setIsUpdateLogExpanded,
  setSelectedTask,
}) {
  const [isEditMode, setIsEditMode] = useState(false)
  const taskRef = useRef(null)

  useEffect(() => {
    if (!taskRef.current) return
    dragRef(dropRef(taskRef))
  }, [])

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: itemTypes.TASK,
    item: { type: itemTypes.TASK, id: task.id, taskIdx },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [, dropRef] = useDrop(() => ({
    accept: itemTypes.TASK,
    hover: (item, monitor) => {
      if (!dropRef) {
        return
      }

      const draggedTaskIdx = item.taskIdx
      const hoveredTaskIdx = taskIdx

      if (draggedTaskIdx === hoveredTaskIdx) return

      // Getting the middle point of the hovered task
      const hoverBoundingRect = taskRef.current.getBoundingClientRect()
      const { top, bottom } = hoverBoundingRect
      const hoverVerticalMiddle = (bottom - top) / 2

      // Getting the mouse's distance from top edge of the hovered task
      const mousePosition = monitor.getClientOffset()
      const distanceFromTop = mousePosition.y - top
    },
  }))

  function getFormattedTimeline(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1)
    const date2 = new Date(timestamp2)

    const day1 = date1.getDate()
    const day2 = date2.getDate()
    const month2 = date2.toLocaleString('default', { month: 'short' })

    const formattedDateRange = `${day1} - ${day2} ${month2}`
    return formattedDateRange
  }

  function getStatusBG(taskStatus) {
    const status = board.statuses?.find(s => s.title === taskStatus)
    return { backgroundColor: status?.color }
  }

  function getPriorityBG(taskPriority) {
    const priority = board.priorities?.find(p => p.title === taskPriority)
    return { backgroundColor: priority?.color }
  }

  function onOpenUpdateLog(task) {
    setIsUpdateLogExpanded(true)
    setSelectedTask(task)
  }

  function getFileType() {}

  return (
    <>
      <article
        ref={taskRef}
        className="task-preview"
        style={{ backgroundColor: isDragging ? 'pink' : '' }}
      >
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
          <p className="msg-btn" onClick={() => onOpenUpdateLog(task)}>
            <MsgIcon />
          </p>
        </div>

        <p className="task-persons-img">
          {task.personsIds
            ? task.personsIds.map(id => (
                <img key={id} src={`${boardService.getPersonUrl(board, id)}`} alt="" />
              ))
            : ''}
        </p>
        <p style={getStatusBG(task.status || '')} className="task-status">
          {task.status ? task.status : ''}
        </p>
        <p style={getPriorityBG(task.priority || '')} className="task-priority">
          {task.priority ? task.priority : ''}
        </p>
        <p className="task-timeline">
          {task.timeline
            ? getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
            : '-'}
        </p>
        <p className="task-files">{task.files ? getFileType() : ''}</p>
      </article>

      <div style={{ height: '50px', width: '100%', border: '3px solid black' }}></div>
    </>
  )
}
