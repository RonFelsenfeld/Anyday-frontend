import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { saveTask } from '../store/actions/board.actions'
import { utilService } from '../services/util.service'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function TimelinePicker({ group, task }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  const [range, setRange] = useState(null)
  const prevRangeRef = useRef()

  useEffect(() => {
    if (task.timeline) {
      const currentTimeLine = {
        from: new Date(task.timeline.startDate),
        to: new Date(task.timeline.dueDate),
      }
      setRange({ ...currentTimeLine })
      prevRangeRef.current = { ...currentTimeLine }
    }
  }, [])

  useEffectUpdate(() => {
    if (!range) {
      const { from } = prevRangeRef.current

      setRange({ from, to: from })
      return
    }

    prevRangeRef.current = { ...range }
    updateTaskTimeline(range)
  }, [range])

  async function updateTaskTimeline({ from, to }) {
    if (!to) to = from

    const startDate = new Date(from).getTime()
    const dueDate = new Date(to).getTime()

    const newTimeLine = {
      startDate,
      dueDate,
    }

    const currActivity = {
      id: utilService.makeId(),
      byPerson: user || guest,
      action: `Timeline`,
      createdAt: Date.now(),
      color: group.style.color,
      oldTimeLine: task.timeline,
      newTimeLine,
    }

    const activities = task.activities ? [...task.activities, currActivity] : [currActivity]

    const editedTask = {
      ...task,
      timeline: { ...newTimeLine },
      activities,
    }

    try {
      await saveTask(board, group, editedTask)
    } catch (err) {
      console.log('Had issues updating task timeline')
    }
  }

  const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }

  return (
    <article className="timeline-picker">
      <header className="timeline-header flex align-center">
        <h2 className="timeline-title">Set Dates</h2>
      </header>

      <DayPicker
        mode="range"
        showOutsideDays
        selected={range}
        onSelect={setRange}
        modifiersStyles={{
          selected: { backgroundColor: '#0073ea', border: 'none !important' },
        }}
      />
    </article>
  )
}
