import { useState } from 'react'

import { AddBoardBtn, SearchIconSideBar } from '../services/svg.service'
import { boardService } from '../services/board.service'

export function SidebarSearch({ addBoard }) {
  const [isFocused, setIsFocused] = useState(false)

  function onAddBoardClick() {
    const board = boardService.getEmptyBoard()
    addBoard(board)
  }

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
      <button onClick={onAddBoardClick} className="add-board-btn btn">
        <AddBoardBtn />
      </button>
    </div>
  )
}
