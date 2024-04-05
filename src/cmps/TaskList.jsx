import { EditableText } from './EditableText'
import { TaskPreview } from './TaskPreview'

export function TaskList({ board, group }) {
  function getColName(cmp) {
    switch (cmp) {
      case 'PersonsPicker':
        return 'Person'
      case 'StatusPicker':
        return 'Status'
      case 'PriorityPicker':
        return 'Priority'
      case 'TimelinePicker':
        return 'Timeline'
      case 'FilesPicker':
        return 'Files'
      default:
        cmp
    }
  }

  function onAddTask(task) {}

  return (
    <ul className="group-list clean-list">
      <li>
        <input type="checkbox" name="all-tasks" />
        <h3>Task</h3>
        {board.cmpsOrder.map((cmp, idx) => (
          <h3 key={idx}>{getColName(cmp)}</h3>
        ))}
      </li>

      {group.tasks.map(task => (
        <li className="task" key={task.id}>
          <input type="checkbox" name="task" />
          <TaskPreview board={board} group={group} task={task} />
        </li>
      ))}

      <li className="add-task">
        <div></div>
        <EditableText name="add-task" placeholder="+ Add task" func={onAddTask} />
      </li>
    </ul>
  )
}
