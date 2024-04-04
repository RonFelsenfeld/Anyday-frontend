import { BoardIcon, Favorite, WorkspaceLogo } from '../services/svg.service'

export function BoardPreview() {
  return (
    <article className="board-preview">
      <div className="preview-container">
        <img src="/assets/img/board-preview.svg" alt="Board preview" className="board-img" />

        <div className="board-container">
          <div className="flex align-center justify-between">
            <div className="board-details flex align-center">
              <BoardIcon />
              <h2 className="board-title">Frontend</h2>
            </div>

            <button className="btn-favorite">
              <Favorite />
            </button>
          </div>

          <div className="workspace-details flex align-center">
            <WorkspaceLogo />
            <span className="workspace-title">Work management &#62; Main workspace</span>
          </div>
        </div>
      </div>
    </article>
  )
}
