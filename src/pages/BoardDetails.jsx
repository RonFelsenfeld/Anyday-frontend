import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { boardService } from '../services/board.service'
import { removeGroup, saveGroup } from '../store/actions/board.actions'
import { AddBoardBtn, ArrowDown, WorkSpaceOption } from '../services/svg.service'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'
import { UpdateLog } from '../cmps/UpdateLog'
import { Loader } from '../cmps/Loader'

export function BoardDetails() {
  const [board, setBoard] = useState()
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)
  const [isUpdateLogExpanded, setIsUpdateLogExpanded] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const headerRef = useRef()
  const boardDetailsRef = useRef()
  const editedGroupTitle = useRef(null)

  const { boardId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) loadBoard()
  }, [boardId])

  useEffect(() => {
    if (!headerRef.current || !boardDetailsRef.current) return

    const headerObserver = new IntersectionObserver(handleIntersection, {
      root: boardDetailsRef.current,
      threshold: 0.99999,
    })

    headerObserver.observe(headerRef.current)

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
  }, [board])

  async function loadBoard() {
    try {
      const board = await boardService.getById(boardId)
      setBoard(board)
    } catch (err) {
      console.log('Had issues loading board', err)
      navigate('/board')
    }
  }

  async function onAddGroup() {
    const newGroup = boardService.getEmptyGroup()
    try {
      const savedBoard = await saveGroup(board, newGroup)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onEditGroupTitle(groupId) {
    const groupToEdit = boardService.getGroupById(board, groupId)
    groupToEdit.title = prompt('Enter new title')
    if (!groupToEdit.title) return
    try {
      const savedBoard = await saveGroup(board, groupToEdit)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      const savedBoard = await removeGroup(board, groupId)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues removing group', err)
    }
  }

  // const isUpdateLogOpenClass = !isUpdateLogExpanded ? 'closed' : ''

  if (!board) return <Loader />
  return (
    <section className="board-details" ref={boardDetailsRef}>
      {/* <div className={`${isUpdateLogOpenClass}`}> */}
      <UpdateLog
        board={board}
        selectedTask={selectedTask}
        setIsUpdateLogExpanded={setIsUpdateLogExpanded}
        isUpdateLogExpanded={isUpdateLogExpanded}
      />
      {/* </div> */}
      <div ref={headerRef}>
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
              <div className="group-header">
                <button className="board-menu-btn" onClick={() => onRemoveGroup(group.id)}>
                  <WorkSpaceOption />
                </button>
                <button className="collapse-btn" style={{ color: group.style.color }}>
                  <ArrowDown />
                </button>
                <h2
                  style={{ color: group.style.color }}
                  onClick={() => onEditGroupTitle(group.id)}
                  className="group-title"
                >
                  {group.title}
                </h2>
                <h2 className="tasks-left">{`${group.tasks.length} Tasks`}</h2>
              </div>
              <div className="group-content">
                <TaskList
                  setSelectedTask={setSelectedTask}
                  isUpdateLogExpanded={isUpdateLogExpanded}
                  setIsUpdateLogExpanded={setIsUpdateLogExpanded}
                  board={board}
                  group={group}
                  setBoard={setBoard}
                />
              </div>
            </article>
          )
        })}
      </div>

      <button className="add-group-btn" onClick={onAddGroup}>
        <AddBoardBtn /> Add new group
      </button>
    </section>
  )
}
