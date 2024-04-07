import { Filter, Hide, Search, Sort, UserImg } from '../services/svg.service'

export function BoardControls({ handleMouseIn, handleMouseOut }) {
  return (
    <section className="board-controls flex align-center">
      <button className="btn btn-new-task">New task</button>

      <button className="btn btn-action flex align-center">
        <Search />
        <span className="btn-title">Search</span>
      </button>

      <button
        className="btn btn-action flex align-center"
        onMouseEnter={ev => handleMouseIn(ev, 'Filter board by person')}
        onMouseLeave={handleMouseOut}
      >
        <UserImg />
        <span className="btn-title">Person</span>
      </button>

      <button
        className="btn btn-action flex align-center"
        onMouseEnter={ev => handleMouseIn(ev, 'Filter board by anything')}
        onMouseLeave={handleMouseOut}
      >
        <Filter />
        <span className="btn-title">Filter</span>
      </button>

      <button
        className="btn btn-action flex align-center"
        onMouseEnter={ev => handleMouseIn(ev, 'Sort board by any column')}
        onMouseLeave={handleMouseOut}
      >
        <Sort />
        <span className="btn-title">Sort</span>
      </button>

      <button
        className="btn btn-action flex align-center"
        onMouseEnter={ev => handleMouseIn(ev, 'Hidden columns')}
        onMouseLeave={handleMouseOut}
      >
        <Hide />
        <span className="btn-title">Hide</span>
      </button>
    </section>
  )
}
