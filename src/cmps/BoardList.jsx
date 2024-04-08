import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowDown, ArrowRight } from '../services/svg.service'

import { BoardPreview } from './BoardPreview'

export function BoardList({ boards }) {
  const [isExpanded, setIsExpanded] = useState(true)

  function toggleIsExpanded() {
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  return (
    <section className="board-list-section">
      <header className="board-list-header flex align-center">
        <button
          className="btn-expand-list flex align-center justify-center"
          onClick={toggleIsExpanded}
        >
          {isExpanded ? <ArrowDown /> : <ArrowRight />}
        </button>
        <h2 className="list-title">Recently visited</h2>
      </header>

      {isExpanded && (
        <ul className="board-list board-layout clean-list">
          {boards.map(board => (
            <li key={board._id} className="board-preview-li">
              <Link to={`/board/${board._id}`}>
                <BoardPreview board={board} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
