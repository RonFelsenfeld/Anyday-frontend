import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { boardService } from '../services/board.service'
import { saveTask, removeTask } from '../store/actions/board.actions'

import { EditableText } from './EditableText'
import { TaskPreview } from './TaskPreview'

export function TaskList({
  board,
  group,
  setBoard,
  setSelectedTask,
  isUpdateLogExpanded,
  setIsUpdateLogExpanded,
}) {
  const [taskList, setTaskList] = useState(group.tasks)
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

  function handleOnDragEnd(result) {
    if (!result.destination) return
    const items = Array.from(taskList)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTaskList(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tasks">
        {provider => {
          return (
            <ul
              className="group-container clean-list"
              {...provider.droppableProps}
              ref={provider.innerRef}
            >
              <div style={{ borderColor: group.style.color }} className="group-list">
                <li className="group-first-row">
                  <input type="checkbox" name="all-tasks" />
                  <h3>Task</h3>
                  {board.cmpsOrder.map((cmp, idx) => (
                    <h3 key={idx}>{getColName(cmp)}</h3>
                  ))}
                </li>

                {taskList.map((task, idx) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                      {provider => (
                        <li
                          className="task"
                          {...provider.draggableProps}
                          {...provider.dragHandleProps}
                          ref={provider.innerRef}
                        >
                          <TaskPreview
                            board={board}
                            group={group}
                            task={task}
                            taskIdx={idx}
                            onRemoveTask={onRemoveTask}
                            taskToEdit={taskToEdit}
                            setTaskToEdit={setTaskToEdit}
                            onSaveTask={onSaveTask}
                            setSelectedTask={setSelectedTask}
                            isUpdateLogExpanded={isUpdateLogExpanded}
                            setIsUpdateLogExpanded={setIsUpdateLogExpanded}
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                })}
              </div>

              <li style={{ borderColor: group.style.color }} className="add-task-li">
                <input disabled className="add-task-checkbox" type="checkbox" name="task" />
                <div
                  className="add-task-container"
                  onClick={() => setTaskToEdit(boardService.getEmptyTask())}
                >
                  <EditableText
                    name="add-task"
                    placeholder="+ Add task"
                    func={onSaveTask}
                    isNew={true}
                  />
                </div>
              </li>
              {provider.placeholder}
            </ul>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}
