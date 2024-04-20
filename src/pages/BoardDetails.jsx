import { useEffect, useRef, useState } from 'react'
import { Outlet, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { boardService } from '../services/board.service'
import {
  loadBoard,
  onFilterSortBoard,
  removeGroup,
  saveBoard,
  saveGroup,
  saveTask,
} from '../store/actions/board.actions'
import { AddBoardBtn } from '../services/svg.service'
import { EDIT_BOARD, SET_ACTIVE_TASK_ID, SET_BOARD } from '../store/reducers/board.reducer'

import { BoardHeader } from '../cmps/BoardHeader'
import { Loader } from '../cmps/Loader'
import { useSecondRender } from '../customHooks/useSecondRender'
import { GroupPreview } from '../cmps/GroupPreview'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { SOCKET_EVENT_BOARD_UPDATED, socketService } from '../services/socket-service'
import { useScroll } from '../customHooks/useScroll'

export function BoardDetails() {
  const fullBoard = useSelector(storeState => storeState.boardModule.currentBoard)
  const filteredBoard = useSelector(storeState => storeState.boardModule.filteredBoard)
  const groupTaskFilterBy = useSelector(storeState => storeState.boardModule.groupTaskFilterBy)
  const sortBy = useSelector(storeState => storeState.boardModule.boardSortBy)

  // const markedTxt = useSelector(storeState => storeState.boardModule.markedTxt)
  const [isAllGroupsExpended, setIsAllGroupsExpended] = useState(true)

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)
  const [groupToEdit, setGroupToEdit] = useState(null)
  const [placeholderProps, setPlaceholderProps] = useState({})

  const boardDetailsRef = useRef()
  const sentinelRef = useRef()
  const draggableDOMref = useRef()

  const { boardId } = useParams()
  const dispatch = useDispatch()

  useSecondRender(createObserver)
  useScroll(boardDetailsRef.current)

  useEffect(() => {
    if (boardId) loadBoard(boardId)

    socketService.on(SOCKET_EVENT_BOARD_UPDATED, board => {
      console.log(board)
      dispatch({ type: EDIT_BOARD, board })
    })

    return () => {
      // dispatch({ type: SET_BOARD, board: null })
      socketService.off(SOCKET_EVENT_BOARD_UPDATED)
    }
  }, [boardId])

  useEffect(() => {
    if (fullBoard) onFilterSortBoard(fullBoard, groupTaskFilterBy, sortBy)
  }, [fullBoard, groupTaskFilterBy, sortBy])

  function createObserver() {
    if (!boardDetailsRef.current) return

    const headerObserver = new IntersectionObserver(handleIntersection, {
      root: boardDetailsRef.current,
      threshold: 0.9999,
    })

    if (sentinelRef.current) {
      headerObserver.observe(sentinelRef.current)
    } else {
      headerObserver.unobserve(sentinelRef.current)
    }

    function handleIntersection(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry
        setIsHeaderExpanded(isIntersecting)
      })
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

    const items = Array.from(fullBoard.groups)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    fullBoard.groups = [...items]

    setPlaceholderProps({})

    try {
      await saveBoard(fullBoard)
    } catch (err) {
      console.log('Dragging -> Had issues saving board')
    }
  }

  async function onAddGroup() {
    const newGroup = boardService.getEmptyGroup()
    try {
      await saveGroup(fullBoard, newGroup)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      await removeGroup(fullBoard, groupId)
      showSuccessMsg(' We successfully deleted 1 item')
    } catch (err) {
      showErrorMsg('Sorry, something wend wrong')
      console.log('Had issues removing group', err)
    }
  }

  async function onAddNewTask() {
    const newTask = boardService.getEmptyTask()
    newTask.title = 'New task'

    const groupToSave = fullBoard.groups?.find(g => g.id === filteredBoard?.groups[0].id)

    try {
      await saveTask(fullBoard, groupToSave, newTask, true) // true => add at the beggining
      dispatch({ type: SET_ACTIVE_TASK_ID, taskId: filteredBoard.groups[0].tasks[0].id })
    } catch (err) {
      console.log('Had issues adding task', err)
    }
  }

  if (!fullBoard) return <Loader />
  return (
    <section className="board-details" ref={boardDetailsRef}>
      <div className="sentinel" ref={sentinelRef}></div>

      <div className={`sticky ${!isHeaderExpanded ? 'header-collapsed' : ''}`}>
        <BoardHeader
          board={filteredBoard}
          isHeaderExpanded={isHeaderExpanded}
          setIsHeaderExpanded={setIsHeaderExpanded}
          onAddNewTask={onAddNewTask}
        />
      </div>
      {!filteredBoard.groups ||
        (!filteredBoard.groups.length && (
          <div className="not-found">
            <img className="no-board-img" src="/assets/img/search_empty_state.svg" />
            <h2 className="txt not-found-title">No results found</h2>
            <p className="txt">
              Try using a different search term, configuring the search options or <br />
              use ”Search Everything” to search across the entire account
            </p>
          </div>
        ))}
      {
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={handleOnDragUpdate}>
            <Droppable droppableId="groups">
              {(provider, snapshot) => (
                <div
                  {...provider.droppableProps}
                  ref={provider.innerRef}
                  className={`group-container droppable-area ${
                    snapshot.isDraggingOver ? 'dragging-layout' : ''
                  }`}
                >
                  {filteredBoard.groups.map((group, idx) => (
                    <GroupPreview
                      key={group.id}
                      group={group}
                      isHeaderExpanded={isHeaderExpanded}
                      onAddGroup={onAddGroup}
                      onRemoveGroup={onRemoveGroup}
                      setGroupToEdit={setGroupToEdit}
                      groupToEdit={groupToEdit}
                      snapshot={snapshot}
                      draggableDOMref={draggableDOMref}
                      idx={idx}
                      isAllGroupsExpended={isAllGroupsExpended}
                      setIsAllGroupsExpended={setIsAllGroupsExpended}
                    />
                  ))}
                  {provider.placeholder}
                  {snapshot.isDraggingOver && (
                    <div
                      className="dragging-placeholder"
                      style={{
                        top: placeholderProps.clientY,
                        left: placeholderProps.clientX + 6 + 'px',
                        height: placeholderProps.clientHeight,
                        width: placeholderProps.clientWidth,
                      }}
                    />
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      }

      <button
        className="add-group-btn"
        onClick={onAddGroup}
        disabled={groupTaskFilterBy.txt || groupTaskFilterBy.person}
      >
        <AddBoardBtn /> Add new group
      </button>

      <Outlet />
    </section>
  )
}
