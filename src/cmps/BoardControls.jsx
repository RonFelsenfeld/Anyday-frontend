import { useState } from 'react'
import { Filter, Hide, Search, Sort, UserImg } from '../services/svg.service'
import { hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { setGroupTaskFilterBy } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
// import { useSelector } from 'react-redux'

export function BoardControls() {
  const [isFilterInput, setIsFilterInput] = useState(false)
  // const markedTxt = useSelector(storeState => storeState.boardModule.markedTxt)
  const board = useSelector(stateStore => stateStore.boardModule.currentBoard)

  function onSetGroupTaskFilterBy(groupTaskFilterBy) {
    setGroupTaskFilterBy(groupTaskFilterBy)
  }

  function handlePersonFilter({ currentTarget }) {
    console.log(currentTarget)
  }

  function handleChange({ target }) {
    const { value } = target
    onSetGroupTaskFilterBy({ txt: value })
    // markFilteredTxt(value)
  }

  return (
    <section className="board-controls flex align-baseline">
      <button className="btn btn-new-task">New task</button>

      <div className="filter-sort-btns flex align-center">
        {!isFilterInput && (
          <button
            onClick={() => setIsFilterInput(true)}
            className="btn btn-action flex align-center"
          >
            <Search />
            <span className="btn-title">Search</span>
          </button>
        )}
        {isFilterInput && (
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search this board "
            onBlur={() => setIsFilterInput(false)}
          />
        )}

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.currentTarget, 'Filter board by person')}
          onMouseLeave={() => hideToolTip()}
          onClick={handlePersonFilter}
        >
          <UserImg />
          <span className="btn-title">Person</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.currentTarget, 'Filter board by anything')}
          onMouseLeave={() => hideToolTip()}
        >
          <Filter />
          <span className="btn-title">Filter</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.currentTarget, 'Sort board by any column')}
          onMouseLeave={() => hideToolTip()}
        >
          <Sort />
          <span className="btn-title">Sort</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.currentTarget, 'Hidden columns')}
          onMouseLeave={() => hideToolTip()}
        >
          <Hide />
          <span className="btn-title">Hide</span>
        </button>
      </div>
    </section>
  )
}
