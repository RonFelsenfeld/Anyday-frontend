import { Filter, Hide, Home, Search, Sort, UserImg } from '../services/svg.service'

export function BoardControls() {
  return (
    <section className="board-controls">
      <div>
        <button className="view-btn flex align-center">
          <Home />
          <span>Main Table</span>
        </button>
      </div>

      <div className="controls-container flex align-center">
        <button className="btn btn-new-task">New task</button>

        <button className="btn btn-action flex align-center">
          <Search />
          <span className="btn-title">Search</span>
        </button>

        <button className="btn btn-action flex align-center">
          <UserImg />
          <span className="btn-title">Person</span>
        </button>

        <button className="btn btn-action flex align-center">
          <Filter />
          <span className="btn-title">Filter</span>
        </button>

        <button className="btn btn-action flex align-center">
          <Sort />
          <span className="btn-title">Sort</span>
        </button>

        <button className="btn btn-action flex align-center">
          <Hide />
          <span className="btn-title">Hide</span>
        </button>
      </div>
    </section>
  )
}
