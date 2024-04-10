import { useEffect, useState } from 'react'
import { AddBoardBtn, SearchIconSideBar } from '../services/svg.service'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'

export function SidebarSearch({ onAddBoard, boardFilterBy, onSetBoardFilter }) {
  const [isFocused, setIsFocused] = useState(false)
  const [filterByToEdit, setFilterByToEdit] = useState({ ...boardFilterBy })

  useEffect(() => {
    onSetBoardFilter(filterByToEdit)

  }, [filterByToEdit])
  const dynClass = isFocused ? 'focused' : ''

  function handleChange({ target }) {
    const { value } = target
    setFilterByToEdit(prev => ({ ...prev, txt: value }))
  }

  return (
    <div className="side-bar-search-add flex justify-between">
      <div className={`side-bar-search-input flex align-center ${dynClass}`}>
        <button>
          <SearchIconSideBar />
        </button>

        <input
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChange={handleChange}
          type="text"
          placeholder="Search"
          value={filterByToEdit.txt}
        />
      </div>

      <button
        onClick={onAddBoard}
        className="add-board-btn btn"
        onMouseEnter={ev => showToolTip(ev.target, 'Add item to workspace')}
        onMouseLeave={() => hideToolTip()}
      >
        <AddBoardBtn />
      </button>
    </div>
  )
}
