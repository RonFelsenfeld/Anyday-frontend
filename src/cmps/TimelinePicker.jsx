import { useState } from 'react'
import { useSelector } from 'react-redux'
import { DialogContentContainer, DatePicker } from 'monday-ui-react-core'
import moment from 'moment'

import { saveTask } from '../store/actions/board.actions'

export function TimelinePicker({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [startDate, setStartDate] = useState(moment(task.timeline.startDate) || null)
  const [endDate, setEndDate] = useState(moment(task.timeline.dueDate) || null)
  // const [isSelectingStartDate, setIsSelectingStartDate] = useState()

  function handleDatePick({ startDate, endDate }) {}

  return (
    <article className="timeline-picker">
      <header className="timeline-header flex align-center">
        <h2 className="timeline-title">Set Dates</h2>
      </header>
      <DialogContentContainer className="timeline-dialog">
        <DatePicker
          numberOfMonths={2}
          data-testid="date-picker"
          startDate={startDate}
          // endDate={endDate}
          onPickDate={handleDatePick}
          range={true}
        />
      </DialogContentContainer>
    </article>
  )
}
