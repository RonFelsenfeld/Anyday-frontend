import { Activity } from './Activity'

export function ActivityLogView({ selectedTask }) {
  return (
    <div className="activity-view-container update-log-content">
      <div className="activiy-view">
        <ul className="activity-list clean-list">
          {selectedTask.activities?.map(activity => {
            return (
              <li key={activity.id}>
                {<Activity activity={activity} selectedTask={selectedTask} />}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
