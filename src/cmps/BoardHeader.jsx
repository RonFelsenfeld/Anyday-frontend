import { ArrowUp, Favorite, Home, Info, Invite, Options } from '../services/svg.service'
import { hideToolTip, showToolTip } from '../services/event-bus.service'

import { BoardControls } from './BoardControls'

export function BoardHeader({ board, isHeaderExpanded, setIsHeaderExpanded }) {
  function toggleExpanded() {
    setIsHeaderExpanded(prevIsExpanded => !prevIsExpanded)
  }

  function handleMouseIn({ target }, txt) {
    const { left, top, width } = target.getBoundingClientRect()
    const pos = { x: left, y: top }
    showToolTip(txt, pos, width)
  }

  function handleMouseOut() {
    hideToolTip()
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
            onMouseEnter={ev => handleMouseIn(ev, 'Atar Mor')}
            onMouseLeave={handleMouseOut}
          />

          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg"
            alt="User img"
            className="user-img"
            onMouseEnter={ev => handleMouseIn(ev, 'Ron Felsenfeld')}
            onMouseLeave={handleMouseOut}
          />

          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg"
            alt="User img"
            className="user-img"
            onMouseEnter={ev => handleMouseIn(ev, 'Ido Yotvat')}
            onMouseLeave={handleMouseOut}
          />
        </div>
      </button>

      <div className="invite-container flex align-center">
        <button className="btn-invite flex align-center">
          <Invite />
          <span className="invite">Invite / 1</span>
        </button>

        <button
          className="btn-options flex align-center"
          onMouseEnter={ev => handleMouseIn(ev, 'Options')}
          onMouseLeave={handleMouseOut}
        >
          <Options />
        </button>
      </div>

      <div className="views-container">
        <button
          className="view-btn flex align-center"
          onMouseEnter={ev => handleMouseIn(ev, 'Main Table')}
          onMouseLeave={handleMouseOut}
        >
          <Home />
          <span>Main Table</span>
        </button>
      </div>

      <button className="btn-collapse-header flex align-center" onClick={toggleExpanded}>
        <ArrowUp />
      </button>

      <BoardControls handleMouseIn={handleMouseIn} handleMouseOut={handleMouseOut} />
    </header>
  )
}
