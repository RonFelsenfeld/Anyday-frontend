import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'

export function BoardDetails() {
  const [board, setBoard] = useState()
  const { boardId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) loadBoard()
  }, [boardId])

  async function loadBoard() {
    try {
      const board = await boardService.getById(boardId)
      setBoard(board)
    } catch (err) {
      console.log('Had loading board', err)
      navigate('/board')
    }
  }

  if (!board) return <div>Loading...</div>
  return (
    <section className="board-details">
      <BoardHeader />
      {board.groups.map((group, idx) => (
        <article key={group.id} className="board-group">
          <h2 className="group-title">{group.title}</h2>
          <div className="group-content">
            <TaskList board={board} group={group} />
          </div>
        </article>
      ))}
    </section>
  )
}
