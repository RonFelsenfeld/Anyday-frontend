import { ArrowUp, Favorite, Home, Info, Invite, Options } from '../services/svg.service'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'
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
        <button
          className="btn"
          onMouseEnter={ev => showToolTip(ev.target, 'Show board description')}
          onMouseLeave={() => hideToolTip()}
        >
          <Info />
        </button>

        <button
          className="btn"
          onMouseEnter={ev => showToolTip(ev.target, 'Add to favorites')}
          onMouseLeave={() => hideToolTip()}
        >
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
            onMouseEnter={ev => showToolTip(ev.target, 'Atar Mor')}
            onMouseLeave={() => hideToolTip()}
          />

          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg"
            alt="User img"
            className="user-img"
            onMouseEnter={ev => showToolTip(ev.target, 'Ron Felsenfeld')}
            onMouseLeave={() => hideToolTip()}
          />

          <img
            src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg"
            alt="User img"
            className="user-img"
            onMouseEnter={ev => showToolTip(ev.target, 'Ido Yotvat')}
            onMouseLeave={() => hideToolTip()}
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
          onMouseEnter={ev => showToolTip(ev.target, 'Options')}
          onMouseLeave={() => hideToolTip()}
        >
          <Options />
        </button>
      </div>

      <div className="views-container">
        <button
          className="view-btn flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Main Table')}
          onMouseLeave={() => hideToolTip()}
        >
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
