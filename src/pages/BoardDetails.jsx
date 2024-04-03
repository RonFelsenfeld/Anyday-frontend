import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { boardService } from '../services/board.service'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { boardService } from '../services/board.service'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'

export function BoardDetails() {
  const [board, setBoard] = useState()
  const { boardId } = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState()
  const { boardId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (boardId) loadBoard()
  }, [boardId])
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

  if (!board) return <div>Loading...</div>
  return (
    <section className="board-details">
      <BoardHeader />

      {board.groups.map((group, idx) => (
        <article className="board-group">
          <h2>{group.title}</h2>
          <table>
            <thead>
              <tr key={`${group.id}-${idx}`}>
                <th>Task</th>
                {board.cmpsOrder.map((cmp, idx) => (
                  <th key={idx}>{getColName(cmp)}</th>
                ))}
              </tr>
            </thead>

            <TaskList board={board} group={group} />
          </table>
        </article>
      ))}
    </section>
  )
  )
}

