import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { boardService } from '../services/board.service'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'
import { saveGroup } from '../store/actions/board.actions'

export function BoardDetails() {
  const [board, setBoard] = useState()
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)

  const headerRef = useRef()
  const boardDetailsRef = useRef()

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

  if (!board) return <div>Loading...</div>
  return (
    <section className="board-details" ref={boardDetailsRef}>
      <div ref={headerRef}>
        <BoardHeader
          isHeaderExpanded={isHeaderExpanded}
          setIsHeaderExpanded={setIsHeaderExpanded}
        />
      </div>

      <div className="group-container">
        {board.groups.map(group => {
          return (
            <article key={group.id} className="board-group">
              <h2 className="group-title">{group.title}</h2>
              <div className="group-content">
                <TaskList board={board} group={group} />
              </div>
            </article>
          )
        })}
      </div>
      <button onClick={onAddGroup}>Add new group</button>
    </section>
  )
}
