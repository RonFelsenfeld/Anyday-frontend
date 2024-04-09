import { Filter, Hide, Search, Sort, UserImg } from '../services/svg.service'
import { hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'

export function BoardControls() {
  return (
    <section className="board-controls flex align-baseline">
      <button className="btn btn-new-task">New task</button>

      <div className='filter-sort-btns flex align-center'>
        <button className="btn btn-action flex align-center">
          <Search />
          <span className="btn-title">Search</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Filter board by person')}
          onMouseLeave={() => hideToolTip()}
          onClick={ev => showModal(ev, BOTTOM_CENTER, 'hello', false)}
        >
          <UserImg />
          <span className="btn-title">Person</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Filter board by anything')}
          onMouseLeave={() => hideToolTip()}
        >
          <Filter />
          <span className="btn-title">Filter</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Sort board by any column')}
          onMouseLeave={() => hideToolTip()}
        >
          <Sort />
          <span className="btn-title">Sort</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Hidden columns')}
          onMouseLeave={() => hideToolTip()}
        >
          <Hide />
          <span className="btn-title">Hide</span>
        </button>
      </div>
    </section>
  )
}
