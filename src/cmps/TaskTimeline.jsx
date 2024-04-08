import { utilService } from '../services/util.service'

export function TaskTimeline({ group, task }) {
  return (
    <p className="task-timeline">
      {task.timeline
        ? utilService.getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
        : '-'}
    </p>
  )
}
