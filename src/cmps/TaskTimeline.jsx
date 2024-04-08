import { utilService } from '../services/util.service'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'

export function TaskTimeline({ group, task }) {
  function handlePickerClick({ currentTarget }) {
    const cmpInfo = {
      type: 'timelinePicker',
      group,
      task,
      // submitFunc: onUpdateTaskStatus,
    }

    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  return (
    <div className="task-row task-timeline" onClick={handlePickerClick}>
      <div className="progress-bar">
        {task.timeline
          ? utilService.getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
          : '-'}
      </div>
    </div>
  )
}
