import React from 'react'

export function TaskPreview({ board, group, task }) {
  function getPersonUrl(personId) {
    const person = board.persons.find(p => p.id === personId)
    return person?.imgUrl
  }

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

  function getFileType() { }

  return (
    <article className='task-preview'>
      <input type="checkbox" name="task" />
      <p className="task-title">{task.title}</p>
      <p className="task-persons-img">
        {task.personsIds
          ? task.personsIds.map(id => <img key={id} src={`${getPersonUrl(id)}`} alt="" />)
          : ''}
      </p>
      <p style={getStatusBG(task.status)} className="task-status">
        {task.status ? task.status : ''}
      </p>
      <p style={getPriorityBG(task.priority)} className="task-priority">
        {task.priority ? task.priority : ''}
      </p>
      <p className="task-timeline">
        {task.timeline ? getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate) : '-'}
      </p>
      <p className="task-files">{task.files ? getFileType() : ''}</p>
    </article>
  )
}
