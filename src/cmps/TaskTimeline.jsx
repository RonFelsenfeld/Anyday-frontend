import { utilService } from '../services/util.service'

export function TaskTimeline({ group, task }) {
  return (
    <div style={{background: `linear-gradient(to right, ${group.style.color} 67%, #333333 67%)`}} className="task-row task-timeline" >
      <div className="progress-bar">
        {task.timeline
          ? utilService.getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
          : '-'}
      </div>
    </div>
  )
}