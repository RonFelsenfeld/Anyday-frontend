import { useEffect, useRef, useState } from 'react'
import { Outlet, useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { boardService } from '../services/board.service'
import { loadBoard, removeGroup, saveGroup } from '../store/actions/board.actions'
import { AddBoardBtn } from '../services/svg.service'
import { SET_BOARD } from '../store/reducers/board.reducer'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'
import { Loader } from '../cmps/Loader'
import { useSecondRender } from '../customHooks/useSecondRender'
import { GroupHeader } from '../cmps/GroupHeader'

export function BoardDetails() {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)
  const [groupToEdit, setGroupToEdit] = useState(null)

  const boardDetailsRef = useRef()
  const sentinelRef = useRef()

  const { boardId } = useParams()
  const dispatch = useDispatch()

  useSecondRender(createObserver)

  useEffect(() => {
    if (boardId) loadBoard(boardId)

    return () => dispatch({ type: SET_BOARD, board: null })
  }, [boardId])

  function createObserver() {
    const headerObserver = new IntersectionObserver(handleIntersection, {
      root: boardDetailsRef.current,
      threshold: 0.9999,
    })

    headerObserver.observe(sentinelRef.current)

    function handleIntersection(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry
        setIsHeaderExpanded(isIntersecting)
      })
    }

    document.title = `(${boardService.getTotalTasksByBoard(board)}) ${board.title}`

    return () => {
      headerObserver.disconnect()
    }
  }

  async function onAddGroup() {
    const newGroup = boardService.getEmptyGroup()
    try {
      await saveGroup(board, newGroup)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      await removeGroup(board, groupId)
    } catch (err) {
      console.log('Had issues removing group', err)
    }
  }

  if (!board) return <Loader />
  return (
    <section className="board-details" ref={boardDetailsRef}>
      <div className="sentinel" ref={sentinelRef}></div>

      <div className="sticky">
        <BoardHeader
          board={board}
          isHeaderExpanded={isHeaderExpanded}
          setIsHeaderExpanded={setIsHeaderExpanded}
        />
      </div>

      <div className="group-container">
        {board.groups.map(group => {
          return (
            <article key={group.id} className="board-group">
              <GroupHeader
                group={group}
                isHeaderExpanded={isHeaderExpanded}
                onRemoveGroup={onRemoveGroup}
                setGroupToEdit={setGroupToEdit}
                groupToEdit={groupToEdit}
              />

              <div className="group-content">
                <TaskList group={group} />
              </div>
            </article>
          )
        })}
      </div>

      <button className="add-group-btn" onClick={onAddGroup}>
        <AddBoardBtn /> Add new group
      </button>

      <Outlet />
    </section>
  )
}
