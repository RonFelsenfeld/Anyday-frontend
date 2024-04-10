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

  const percentage = utilService.calcPercentageOfElapsedTime(task?.timeline?.startDate, task?.timeline?.dueDate)
  const numOfDays = utilService.getNumOfDays(task?.timeline?.startDate, task?.timeline?.dueDate)
  const hoverDisplay = task.timeline ? `${numOfDays} days` : 'Set days'

  return (
    <div
      style={{ background: `linear-gradient(to right, ${group.style.color} ${percentage}%, #333333 ${percentage}%)` }}
      className="task-row task-timeline"
      onClick={handlePickerClick}
    >
      <div className="progress-bar">
        {task.timeline
          ? utilService.getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
          : '-'}
      </div>
      <div className='days-num'>{hoverDisplay}</div>
    </div>
  )
}
