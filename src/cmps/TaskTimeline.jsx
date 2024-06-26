import { useSelector } from 'react-redux'

import { showErrorMsg } from '../services/event-bus.service'
import { Xbutton } from '../services/svg.service'
import { utilService } from '../services/util.service'

import { saveTask } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'

export function TaskTimeline({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  function handlePickerClick({ target, currentTarget }) {
    // ! Event propagation doesn't work
    if (target.nodeName === 'svg' || target.nodeName === 'path') return

    const cmpInfo = {
      type: 'timelinePicker',
      group,
      task,
    }

    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  async function onRemoveTimeline() {
    const taskToSave = { ...task, timeline: null }
    const groupToSave = board.groups.find(g => g.id === group.id)

    try {
      await saveTask(board, groupToSave, taskToSave)
    } catch (err) {
      showErrorMsg('Sorry, something went wrong')
    }
  }

  function getTimelineColor() {
    if (!task.timeline || (!task.timeline.startDate && !task.timeline.dueDate)) {
      return 'rgb(196, 196, 196)'
    }

    const percentage = utilService.calcPercentageOfElapsedTime(
      task?.timeline?.startDate,
      task?.timeline?.dueDate
    )

    return `linear-gradient(to right, ${group.style.color} ${percentage}%, #333333 ${percentage}%)`
  }

  const numOfDays = utilService.getNumOfDays(task?.timeline?.startDate, task?.timeline?.dueDate)
  const hoverDisplay = task.timeline ? `${numOfDays} days` : 'Set days'

  return (
    <div className="timeline-container task-row flex align-center justify-center">
      <div
        style={{
          background: getTimelineColor(),
        }}
        className="task-row task-timeline"
        onClick={handlePickerClick}
      >
        <div className="progress-bar">
          {task.timeline
            ? utilService.getFormattedTimeline(task.timeline.startDate, task.timeline.dueDate)
            : '-'}
        </div>

        <button
          className="btn-remove-timeline flex align-center justify-center"
          style={{ display: task.timeline ? 'block' : 'none' }}
          onClick={onRemoveTimeline}
        >
          <Xbutton size={16} />
        </button>
        <div className="days-num">{hoverDisplay}</div>
      </div>
    </div>
  )
}
