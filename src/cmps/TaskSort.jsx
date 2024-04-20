import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ArrowDown } from '../services/svg.service'
import { setSortBy } from '../store/actions/board.actions'

export function TaskSort({ setIsSorting }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const sortBy = useSelector(storeState => storeState.boardModule.boardSortBy)

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isDirDropdownOpen, setIsDirDropdownOpen] = useState()
  const { cmpsOrder: sortByOptions } = board

  useEffect(() => {
    if (!sortBy) setSortBy({ txt: 1 })
  }, [])

  function toggleDropdown(dropdown) {
    if (dropdown === 'sort') return setIsSortDropdownOpen(prev => !prev)
    return setIsDirDropdownOpen(prev => !prev)
  }

  function onSetSortBy({ currentTarget }) {
    const { value } = currentTarget.dataset
    const currSortDir = Object.values(sortBy)[0]
    setSortBy({ [value]: currSortDir })
  }

  function onSetSortDir(dir) {
    const currSortCriteria = Object.keys(sortBy)[0]
    setSortBy({ [currSortCriteria]: dir })
  }

  function onRemoveSort() {
    setSortBy(null)
    setIsSorting(false)
  }

  function getActiveSortClass(option) {
    const currSortCriteria = Object.keys(sortBy)[0]
    if (currSortCriteria === option) return 'active'
    return ''
  }

  function getActiveDirClass(dir) {
    const currSortDir = Object.values(sortBy)[0]
    if (currSortDir === dir) return 'active'
    return ''
  }

  function getFormattedSortBy() {
    const currentSort = Object.keys(sortBy)[0]
    if (currentSort === 'txt') return 'Name'

    const capitalizedSort = currentSort.charAt(0).toUpperCase() + currentSort.slice(1)
    return capitalizedSort
  }

  function getImgSrc(option) {
    if (option === 'status') {
      return `/assets/img/sort-icons/priority.svg`
    }

    return `/assets/img/sort-icons/${option}.svg`
  }

  function getActiveSortImg() {
    const currentSort = Object.keys(sortBy)[0]
    const img = getImgSrc(currentSort)
    return img
  }

  if (sortBy) {
    var currentDir = Object.values(sortBy)[0] === 1 ? 'Ascending' : 'Descending'
  }

  if (!sortBy) return
  return (
    <article className="task-sort">
      <h3 className="sort-by-title">Sort this board by column</h3>

      <div className="dropdowns-container flex">
        <div className="active-sort-option" onClick={() => toggleDropdown('sort')}>
          <img
            src={getActiveSortImg()}
            alt="sorting icon"
            className={`${getFormattedSortBy().toLowerCase()}`}
          />
          <span>{getFormattedSortBy()}</span>
          <button className={`btn-open-dropdown ${isSortDropdownOpen ? 'open' : ''}`}>
            <ArrowDown />
          </button>

          {isSortDropdownOpen && (
            <div className="sort-by-dropdown flex column align-center">
              <div
                className={`dropdown-option flex ${getActiveSortClass('txt')}`}
                onClick={onSetSortBy}
                data-value="txt"
              >
                <img src={getImgSrc('txt')} alt="sorting icon" className="txt" />
                <span>Name</span>
              </div>

              {sortByOptions.map(option => {
                const formattedOption = option.replace('Picker', '')
                const lowercasedOption = formattedOption.toLowerCase()

                return (
                  <div
                    key={option}
                    className={`dropdown-option ${getActiveSortClass(formattedOption)}`}
                    onClick={onSetSortBy}
                    data-value={lowercasedOption}
                  >
                    <img
                      src={getImgSrc(lowercasedOption)}
                      alt="sorting icon"
                      className={`${lowercasedOption}`}
                    />
                    <span>{formattedOption}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="active-dir-option" onClick={() => toggleDropdown('dir')}>
          <span className={`dir-icon ${currentDir === 'Ascending' ? 'ascend' : 'descend'}`}></span>
          <span>{currentDir}</span>
          <button className={`btn-open-dropdown ${isDirDropdownOpen ? 'open' : ''}`}>
            <ArrowDown />
          </button>

          {isDirDropdownOpen && (
            <div className="sort-dir-dropdown flex column align-center">
              <span
                className={`dropdown-dir ascending ${getActiveDirClass(1)}`}
                onClick={() => onSetSortDir(1)}
              >
                Ascending
              </span>
              <span
                className={`dropdown-dir descending ${getActiveDirClass(-1)}`}
                onClick={() => onSetSortDir(-1)}
              >
                Descending
              </span>
            </div>
          )}
        </div>
      </div>

      <button className="btn-remove-sort" onClick={onRemoveSort}>
        Remove sort
      </button>
    </article>
  )
}
