import { useState } from 'react'
import { Link } from 'react-router-dom'

import { BoardPreview } from './BoardPreview'
import { ArrowDown, ArrowRight } from '../services/svg.service'

export function BoardList() {
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
          {/* <Link to={`/workspace/board/${board._id}`}> */}
          <Link to={`/board/b12345`}>
            <BoardPreview />
          </Link>
        </ul>
      )}
    </section>
  )
}
