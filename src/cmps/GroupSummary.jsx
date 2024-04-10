import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"

export function GroupSummary({ group }) {
    const board = useSelector(storeState => storeState.boardModule.currentBoard)
    const { statuses, priorities } = board

    /// STATUS SUMMARY ///
    const groupStatusMap = group.tasks.reduce((acc, t) => {
        if (!acc[t.status]) acc[t.status] = 0
        acc[t.status]++
        return acc
    }, {})

    const statusPercantageMap = {}

    for (const [key, value] of Object.entries(groupStatusMap)) {
        statusPercantageMap[key] = (value / group.tasks.length * 100).toFixed(2) + '%';
    }

    /// PRIORITY SUMMARY ///
    const groupPriorityMap = group.tasks.reduce((acc, t) => {
        if (!acc[t.priority]) acc[t.priority] = 0
        acc[t.priority]++
        return acc
    }, {})

    const priorityPercantageMap = {}

    for (const [key, value] of Object.entries(groupPriorityMap)) {
        priorityPercantageMap[key] = (value / group.tasks.length * 100).toFixed(2) + '%';
    }

    /// TIMELINE SUMMARY ///
    const filteredTasks = group.tasks.filter(t => t.timeline)

    var startDate = Math.min(...filteredTasks.map(t => t?.timeline?.startDate))
    var dueDate = Math.max(...filteredTasks.map(t => t?.timeline?.dueDate))

    const timelinePercentage = filteredTasks.length ? utilService.calcPercentageOfElapsedTime(startDate, dueDate) : 0
    const timelineStyle = filteredTasks.length ?
        `linear-gradient(to right, ${group.style.color} ${timelinePercentage}%, #333333 ${timelinePercentage}%)` : '#c4c4c4'

    const numOfDays = utilService.getNumOfDays(startDate, dueDate)
    const hoverDisplay = filteredTasks.length ? `${numOfDays} days` : '-'

    return <section className="summary-row clean-list">
        <article className="first-empty-article"></article>
        <article className="progress-container status-progress">
            <div className="progress-bar flex">
                {statuses.map(s =>
                    <div key={s.id} style={{ backgroundColor: s.color, color: s.color, width: statusPercantageMap[s.title === '' ? 'undefined' : s.title] }}>
                    </div>)}
            </div>
        </article>

        <article className="progress-container">
            <div className="progress-bar flex">
                {priorities.map(p =>
                    <div key={p.id} style={{ backgroundColor: p.color, color: p.color, width: priorityPercantageMap[p.title === '' ? 'undefined' : p.title] }}>
                    </div>)}
            </div>
        </article>

        <article className="progress-container">
            <div className="timeline-progress-bar"
                style={{ background: timelineStyle }}
            >
                <div className="dates">{(filteredTasks.length) ? utilService.getFormattedTimeline(startDate, dueDate) : '-'}</div>
                <div className='days-num'>{hoverDisplay}</div>
            </div>
        </article>
        <article></article>
        <article></article>
    </section>
}