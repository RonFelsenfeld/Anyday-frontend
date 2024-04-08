import { utilService } from '../services/util.service'

export function TaskTimeline({ board, setBoard, group, task }) {
  return (
    <div className="task-row task-timeline" >
      <div className="progress-bar">
        {task.timeline
          ? utilService.getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
          : '-'}
      </div>
    </div>
  )
}