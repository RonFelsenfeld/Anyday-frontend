import { useState } from 'react'
import { saveTask, removeTask } from '../store/actions/board.actions'
import { EditableText } from './EditableText'
import { TaskPreview } from './TaskPreview'
import { boardService } from '../services/board.service'

export function TaskList({ board, group, setBoard,isUpdateLogExpanded,setIsUpdateLogExpanded,setSelectedTask }) {
  const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())

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

  async function onAddTask(txt) {
    const newTask = { ...taskToEdit, title: txt }
    try {
      const savedBoard = await saveTask(board, group, newTask)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues adding task')
    }
  }

  async function onRemoveTask(taskId) {
    try {
      const savedBoard = await removeTask(board, group, taskId)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues removing task')
    }
  }

  return <ul className='group-container clean-list'>

    <div style={{borderColor: group.style.color}} className='group-list'>
      <li className="group-header">
        <input type="checkbox" name="all-tasks" />
        <h3>Task</h3>
        {board.cmpsOrder.map((cmp, idx) => (
          <h3 key={idx}>{getColName(cmp)}</h3>
        ))}
      </li>

      {group.tasks.map(task => {
        return (
          <li className="task" key={task.id}>
            <TaskPreview
            setSelectedTask={setSelectedTask}
             isUpdateLogExpanded={isUpdateLogExpanded}
             setIsUpdateLogExpanded={setIsUpdateLogExpanded}
             board={board}
              group={group}
               task={task}
              onRemoveTask={onRemoveTask} />
          </li>
        )
      })}
    </div>

    <li style={{borderColor: group.style.color}} className="add-task">
      <div></div>
      <EditableText
        name="add-task"
        placeholder='+ Add task'
        func={onAddTask}
      />
    </li>
  </ul>
}
