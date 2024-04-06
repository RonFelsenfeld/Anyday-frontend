import { useState } from 'react'

import { ArrowUp, Favorite, Home, Info, Invite, Options } from '../services/svg.service'
import { BoardControls } from './BoardControls'

export function BoardHeader({ board, isHeaderExpanded, setIsHeaderExpanded }) {
  function toggleExpanded() {
    setIsHeaderExpanded(prevIsExpanded => !prevIsExpanded)
  }

  const collapsedClass = !isHeaderExpanded ? 'collapsed' : ''

  return (
    <header className={`board-header ${collapsedClass}`}>
      <h1 className="board-title">{board.title}</h1>

      <div className="board-info flex align-center">
        <button className="btn">
          <Info />
        </button>
        <button className="btn">
          <Favorite />
        </button>
      </div>

      <button className="activity-container flex align-center">
        <span>Activity</span>

        <div className="img-container flex">
          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg"
            alt="User img"
            className="user-img"
          />

          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg"
            alt="User img"
            className="user-img"
          />

          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg"
            alt="User img"
            className="user-img"
          />
        </div>
      </button>

      <div className="invite-container flex align-center">
        <button className="btn-invite flex align-center">
          <Invite />
          <span className="invite">Invite / 1</span>
        </button>

        <button className="btn-options flex align-center">
          <Options />
        </button>
      </div>

      <div className="views-container">
        <button className="view-btn flex align-center">
          <Home />
          <span>Main Table</span>
        </button>
      </div>

      <button className="btn-collapse-header flex align-center" onClick={toggleExpanded}>
        <ArrowUp />
      </button>

      <BoardControls />
    </header>
  )
}
