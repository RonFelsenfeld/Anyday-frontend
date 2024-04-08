import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { boardService } from '../services/board.service'
import { saveTask, removeTask, saveBoard } from '../store/actions/board.actions'

import { EditableText } from './EditableText'
import { TaskPreview } from './TaskPreview'

export function TaskList({
  board,
  group,
  setBoard,
  setSelectedTask,
  setIsUpdateLogExpanded,
}) {
  const [taskToEdit, setTaskToEdit] = useState(null)

  async function onSaveTask(title) {
    if (!taskToEdit) return
    const editedTask = { ...taskToEdit, title }

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

  async function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(group.tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    group.tasks = [...items]

    try {
      await saveBoard(board, group)
    } catch (err) {
      console.log('Dragging -> Had issues saving board')
    }
  }

  return (
    <ul className="group-container clean-list">
      <div style={{ borderColor: group.style.color }} className="group-list">
        <li className="group-first-row">
          <input type="checkbox" name="all-tasks" />
          <h3>Task</h3>
          {board.cmpsOrder.map((cmp, idx) => (
            <h3 key={idx}>{boardService.getColTitle(cmp)}</h3>
          ))}
        </li>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {provider => (
              <div {...provider.droppableProps} ref={provider.innerRef}>
                {group.tasks.map((task, idx) => {
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
                            setBoard={setBoard}
                            task={task}
                            onSaveTask={onSaveTask}
                            onRemoveTask={onRemoveTask}
                            setTaskToEdit={setTaskToEdit}
                            setSelectedTask={setSelectedTask}
                            setIsUpdateLogExpanded={setIsUpdateLogExpanded}
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                })}
                {provider.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <li style={{ borderColor: group.style.color }} className="add-task-li">
        <input disabled className="add-task-checkbox" type="checkbox" name="task" />
        <div
          className="add-task-container"
          onClick={() => setTaskToEdit(boardService.getEmptyTask())}
        >
          <EditableText name="add-task" placeholder="+ Add task" func={onSaveTask} isNew={true} />
        </div>
      </li>
    </ul>
  )
}
