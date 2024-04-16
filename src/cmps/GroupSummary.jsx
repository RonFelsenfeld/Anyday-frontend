import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'

export function GroupSummary({ group }) {
  const board = useSelector(storeState => storeState.boardModule.filteredBoard)
  const { statuses, priorities } = board

  /// STATUS SUMMARY ///
  const groupStatusMap = group.tasks.reduce((acc, t) => {
    if (!acc[t.status]) acc[t.status] = 0
    acc[t.status]++
    return acc
  }, {})

  const statusPercantageMap = {}

  for (const [key, value] of Object.entries(groupStatusMap)) {
    statusPercantageMap[key] = Math.round((value / group.tasks.length) * 100) + '%'
  }

  /// PRIORITY SUMMARY ///
  const groupPriorityMap = group.tasks.reduce((acc, t) => {
    if (!acc[t.priority]) acc[t.priority] = 0
    acc[t.priority]++
    return acc
  }, {})

  const priorityPercantageMap = {}

  for (const [key, value] of Object.entries(groupPriorityMap)) {
    priorityPercantageMap[key] = ((value / group.tasks.length) * 100).toFixed(2) + '%'
  }

  /// TIMELINE SUMMARY ///
  const filteredTasks = group.tasks.filter(t => t.timeline)

  var startDate = Math.min(...filteredTasks.map(t => t?.timeline?.startDate))
  var dueDate = Math.max(...filteredTasks.map(t => t?.timeline?.dueDate))

  const timelinePercentage = filteredTasks.length
    ? utilService.calcPercentageOfElapsedTime(startDate, dueDate)
    : 0
  const timelineStyle = filteredTasks.length
    ? `linear-gradient(to right, ${group.style.color} ${timelinePercentage}%, #333333 ${timelinePercentage}%)`
    : '#c4c4c4'

  const numOfDays = utilService.getNumOfDays(startDate, dueDate)
  const hoverDisplay = filteredTasks.length ? `${numOfDays} days` : '-'

  return (
    <section className="summary-row clean-list">
      <article className="sticky-cell"></article>
      <article className="first-empty-article"></article>
      <article className="progress-container status-progress">
        <div className="progress-bar flex">
          {statuses.map(s => (
            <div
              key={s.id}
              onMouseEnter={ev =>
                showToolTip(
                  ev.currentTarget,
                  `${groupStatusMap[s.id]}/${group.tasks.length
                  } \u00A0 ${statusPercantageMap[s.id]}`
                )
              }
              onMouseLeave={() => hideToolTip()}
              style={{
                backgroundColor: s.color,
                color: s.color,
                width: statusPercantageMap[s.id],
              }}
            ></div>
          ))}
        </div>
      </article>

      <article className="progress-container">
        <div className="progress-bar flex">
          {priorities.map(p => (
            <div
              key={p.id}
              onMouseEnter={ev =>
                showToolTip(
                  ev.currentTarget,
                  `${groupPriorityMap[p.id]}/${group.tasks.length
                  } \u00A0 
                            ${priorityPercantageMap[p.id]}`
                )
              }
              onMouseLeave={() => hideToolTip()}
              style={{
                backgroundColor: p.color,
                color: p.color,
                width: priorityPercantageMap[p.id],
              }}
            ></div>
          ))}
        </div>
      </article>

      <article className="progress-container">
        <div className="timeline-progress-bar" style={{ background: timelineStyle }}>
          <div className="dates">
            {filteredTasks.length ? utilService.getFormattedTimeline(startDate, dueDate) : '-'}
          </div>
          <div className="days-num">{hoverDisplay}</div>
        </div>
      </article>
      <article></article>
      <article></article>
    </section>
  )
}
