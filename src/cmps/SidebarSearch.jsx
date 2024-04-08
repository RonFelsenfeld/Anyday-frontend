import { useState } from 'react'
import { AddBoardBtn, SearchIconSideBar } from '../services/svg.service'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'

export function SidebarSearch({ onAddBoard }) {
  const [isFocused, setIsFocused] = useState(false)

  const dynClass = isFocused ? 'focused' : ''

  return (
    <div className="side-bar-search-add flex justify-between">
      <div className={`side-bar-search-input flex align-center ${dynClass}`}>
        <button>
          <SearchIconSideBar />
        </button>

        <input
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          type="text"
          placeholder="Search"
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
