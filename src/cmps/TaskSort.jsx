import { useState } from 'react'
import { useSelector } from 'react-redux'

import { ArrowDown } from '../services/svg.service'
import { setSortBy } from '../store/actions/board.actions'

export function TaskSort() {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const sortBy = useSelector(storeState => storeState.boardModule.boardSortBy)

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isDirDropdownOpen, setIsDirDropdownOpen] = useState()
  const { cmpsOrder: sortByOptions } = board

  function toggleDropdown(dropdown) {
    if (dropdown === 'sort') return setIsSortDropdownOpen(prev => !prev)
    return setIsDirDropdownOpen(prev => !prev)
  }

  function onSetSortBy({ target }) {
    const { value } = target.dataset
    console.log(value)
    const currSortDir = Object.values(sortBy)[0]
    setSortBy({ [value]: currSortDir })
  }

  function onSetSortDir(dir) {
    const currSortCriteria = Object.keys(sortBy)[0]
    setSortBy({ [currSortCriteria]: dir })
  }

  return (
    <article className="task-sort">
      <h3 className="sort-by-title">Sort this board by column</h3>

      <div className="dropdowns-container flex">
        <div className="active-sort-option" onClick={() => toggleDropdown('sort')}>
          <span className="sort-icon"></span>
          <span>Name</span>
          <button className="btn-open-dropdown">
            <ArrowDown />
          </button>

          {isSortDropdownOpen && (
            <div className="sort-by-dropdown flex column align-center">
              <span
                className="dropdown-option flex align-center"
                onClick={onSetSortBy}
                data-value="txt"
              >
                Name
              </span>

              {sortByOptions.map(option => {
                const formattedOption = option.replace('Picker', '')
                return (
                  <span
                    key={option}
                    className="dropdown-option"
                    onClick={onSetSortBy}
                    data-value={formattedOption.toLowerCase()}
                  >
                    {formattedOption}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        <div className="active-dir-option" onClick={() => toggleDropdown('dir')}>
          <span className="dir-icon"></span>
          <span>Ascending</span>
          <button className="btn-open-dropdown">
            <ArrowDown />
          </button>

          {isDirDropdownOpen && (
            <div className="sort-dir-dropdown flex column align-center">
              <span className="dropdown-dir" onClick={() => onSetSortDir(1)}>
                Ascending
              </span>
              <span className="dropdown-dir" onClick={() => onSetSortDir(-1)}>
                Descending
              </span>
            </div>
          )}
        </div>
      </div>

      <button className="btn-remove-sort">Remove sort</button>
    </article>
  )
}
