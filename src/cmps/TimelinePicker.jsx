import { useState } from 'react'
import { useSelector } from 'react-redux'
import { DialogContentContainer, DatePicker } from 'monday-ui-react-core'
import moment from 'moment'

import { saveTask } from '../store/actions/board.actions'
import { utilService } from '../services/util.service'

export function TimelinePicker({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [date, setStartDate] = useState(moment(task.timeline?.startDate) || null)
  const [dueDate, setEndDate] = useState(moment(task.timeline?.dueDate) || null)

  async function onUpdateTimeline({ startDate, endDate }) {
    if (!endDate) endDate = dueDate
    let startDateTS = parseInt(moment(startDate?._d).format("x"))
    let endDateTS = parseInt(moment(endDate?._d).format("x"))
    let durationTS = parseInt(moment(dueDate?._d).format("x")) - parseInt(moment(date?._d).format("x"))

    if (endDateTS < startDateTS) endDateTS = startDateTS + durationTS
    endDate = moment(endDateTS)
    
    setStartDate(startDate)
    setEndDate(endDate)

    const editedTask = {
      ...task, timeline:
      {
        startDate: parseInt(moment(startDate?._d).format("x")),
        dueDate: parseInt(moment(endDate?._d).format("x"))
      }
    }

    try {
      await saveTask(board, group, editedTask)
    } catch (err) {
      console.log('Had issues updating task timeline')
    }
  }

  return (
    <article className="timeline-picker">
      <header className="timeline-header flex align-center">
        <h2 className="timeline-title">Set Dates</h2>
      </header>
      <DialogContentContainer className="timeline-dialog" style={{ boxShadow: 'none' }}>
        <DatePicker
          numberOfMonths={2}
          data-testid="date-picker"
          date={moment(date?._d)}
          endDate={moment(dueDate?._d)}
          onPickDate={d => onUpdateTimeline(d)}
          range
        />
      </DialogContentContainer>
    </article>
  )
}
