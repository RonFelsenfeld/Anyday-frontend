import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { boardService } from '../services/board.service'
import { saveTask, removeTask, saveGroup } from '../store/actions/board.actions'

import { EditableText } from './EditableText'
import { TaskPreview } from './TaskPreview'
import { GroupSummary } from './GroupSummary'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function TaskList({ group }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
  const [placeholderProps, setPlaceholderProps] = useState({})

  const draggableDOMref = useRef()

  async function onSaveTask(title) {
    if (!taskToEdit) return
    const editedTask = { ...taskToEdit, title }
    const groupToSave = board.groups.find(g => g.id === group.id)

    try {
      await saveTask(board, groupToSave, editedTask)
      setTaskToEdit(null)
    } catch (err) {
      showErrorMsg('Sorry, something went wrong')
      // console.log('Had issues adding task')
    }
  }

  async function onRemoveTask(taskId) {
    const groupToSave = board.groups.find(g => g.id === group.id)

    try {
      await removeTask(board, groupToSave, taskId)
      showSuccessMsg('We successfully deleted 1 item')
    } catch (err) {
      showErrorMsg('Sorry, something went wrong')
      // console.log('Had issues removing task')
    }
  }

  function handleOnDragUpdate(update) {
    if (!update.destination) return

    const { index } = update.destination
    const draggedDOM = draggableDOMref.current
    if (!draggedDOM) return

    const { clientHeight, clientWidth } = draggedDOM

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children].slice(0, index).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr)
        const marginBottom = parseFloat(style.marginBottom)
        return total + curr.clientHeight + marginBottom
      }, 0)

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
    })
  }

  async function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(group.tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    let groupToSave = board.groups.find(g => g.id === group.id)
    groupToSave = { ...group, tasks: [...items] }
    group.tasks = [...items]

    setPlaceholderProps({})

    try {
      await saveGroup(board, groupToSave)
    } catch (err) {
      console.log('Dragging -> Had issues saving board')
    }
  }

  return (
    <>
      <ul className="group-container clean-list">
        <div className="group-list">
          <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={handleOnDragUpdate}>
            <Droppable droppableId="tasks">
              {(provider, snapshot) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className="droppable-area"
                >
                  {group.tasks.map((task, idx) => {
                    return (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(provider, snapshot) => (
                          <li
                            className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                            {...provider.draggableProps}
                            {...provider.dragHandleProps}
                            ref={el => {
                              provider.innerRef(el)
                              if (snapshot.isDragging) {
                                draggableDOMref.current = el
                              }
                            }}
                          >
                            <TaskPreview
                              group={group}
                              task={task}
                              onSaveTask={onSaveTask}
                              onRemoveTask={onRemoveTask}
                              setTaskToEdit={setTaskToEdit}
                            />
                          </li>
                        )}
                      </Draggable>
                    )
                  })}
                  {provider.placeholder}
                  {snapshot.isDraggingOver && (
                    <div
                      className="dragging-placeholder"
                      style={{
                        position: 'absolute',
                        top: placeholderProps.clientY,
                        left: placeholderProps.clientX + 6 + 'px',
                        height: placeholderProps.clientHeight,
                        width: placeholderProps.clientWidth - 6 + 'px',
                      }}
                    />
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <li className="add-task-li">
          <div className="task-indicator" style={{ backgroundColor: group.style.color }}></div>
          <input disabled className="add-task-checkbox" type="checkbox" name="task" />
          <div
            className="add-task-container"
            onClick={() => setTaskToEdit(boardService.getEmptyTask())}
          >
            <EditableText name="add-task" placeholder="+ Add task" func={onSaveTask} isNew={true} />
          </div>
        </li>
      </ul>

      <GroupSummary group={group} />
    </>
  )
}
