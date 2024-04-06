import { useState } from 'react'
import { saveTask, removeTask } from '../store/actions/board.actions'
import { EditableText } from './EditableText'
import { TaskPreview } from './TaskPreview'
import { boardService } from '../services/board.service'

export function TaskList({ board, group, setBoard, setSelectedTask,
  isUpdateLogExpanded, setIsUpdateLogExpanded }) {
  const [taskToEdit, setTaskToEdit] = useState(null)

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

  async function onSaveTask(txt) {
    console.log(taskToEdit)
    if (!taskToEdit) return
    const editedTask = { ...taskToEdit, title: txt }
    console.log('savedTask', editedTask)
    try {
      const savedBoard = await saveTask(board, group, editedTask)
      setBoard(savedBoard)
      setTaskToEdit(null)
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

    <div style={{ borderColor: group.style.color }} className='group-list'>
      <li className="group-first-row">
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
              board={board}
              group={group}
              task={task}
              onRemoveTask={onRemoveTask}
              taskToEdit={taskToEdit}
              setTaskToEdit={setTaskToEdit}
              onSaveTask={onSaveTask}

              setSelectedTask={setSelectedTask}
              isUpdateLogExpanded={isUpdateLogExpanded}
              setIsUpdateLogExpanded={setIsUpdateLogExpanded}
            />
          </li>
        )
      })}
    </div>

    <li style={{ borderColor: group.style.color }} className="add-task">
      <div></div>
      <div onClick={() => setTaskToEdit(boardService.getEmptyTask())}>
        <EditableText
          name="add-task"
          placeholder='+ Add task'
          func={onSaveTask}
          isNew={true}
        />
      </div>
    </li>
  </ul>
}
