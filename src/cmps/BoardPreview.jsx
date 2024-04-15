import { showErrorMsg } from '../services/event-bus.service'
import { BoardIcon, Favorite, FullStar, WorkspaceLogo } from '../services/svg.service'
import { saveBoard } from '../store/actions/board.actions'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'

export function BoardPreview({ board }) {
  async function onToggleFavorite() {
    board.isStarred = !board.isStarred

    try {
      await saveBoard(board)
    } catch (err) {
      console.log('Favorite --> Had issues favorite board')
      showErrorMsg('Could not preform the action, try again later.')
    }
  }

  return (
    <article className="board-preview">
      <div className="preview-container">
        <img src="/assets/img/board-preview.svg" alt="Board preview" className="board-img" />

        <div className="board-container">
          <div className="board-title-container flex align-center justify-between">
            <div className="board-details-container flex align-center">
              <BoardIcon />
              <h2 className="board-title">{board.title}</h2>
            </div>

            <button
              className="btn-favorite flex align-center"
              onClick={onToggleFavorite}
              onMouseEnter={ev => showToolTip(ev.currentTarget, 'Add to favorites')}
              onMouseLeave={() => hideToolTip()}
            >
              {board.isStarred ? <FullStar /> : <Favorite />}
            </button>
          </div>

          <div className="workspace-details flex align-center">
            <span>
              <WorkspaceLogo size={14} />
            </span>
            <span className="workspace-title">
              Work management <span>&#62;</span> Main workspace
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
