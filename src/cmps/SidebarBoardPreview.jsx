import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { MiniBoard, Options, WorkSpaceOption } from '../services/svg.service'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_LEFT } from '../store/reducers/system.reducer'

import { EditableText } from './EditableText'
import { useClickOutside } from '../customHooks/useClickOutside'

export function SidebarBoardPreview({
  board,
  onEditBoardTitle,
  onDeleteBoard,
  setBoardToEdit,
  boardToEdit,
}) {
  const isEditing = boardToEdit?._id === board._id
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuBtnRef = useRef()

  useClickOutside(menuBtnRef, () => setIsMenuOpen(false))

  const options = [
    {
      title: 'Rename Board',
      icon: 'pencil',
      func: () => {
        setBoardToEdit(board)
        setIsMenuOpen(false)
      },
    },
    {
      title: 'Delete',
      icon: 'trash',
      func: () => {
        onDeleteBoard(board._id)
        setIsMenuOpen(false)
      },
    },
    {
      title: 'Add to favorites',
      icon: 'favorite',
      func: () => {
        setIsMenuOpen(false)
      }, // ! ADD REAL FUNCTION
    },
  ]

  function handleOptionsClick({ currentTarget }) {
    const cmpInfo = {
      type: 'optionsMenu',
      options,
    }

    showModal(currentTarget, BOTTOM_LEFT, cmpInfo, false)
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
  }

  const openMenuClass = isMenuOpen ? 'menu-open' : ''

  return (
    <NavLink className="navlink" to={`/board/${board._id}`} key={board._id}>
      <article className="board-li flex align-center">
        <MiniBoard className="mini-board-svg" />

        <div key={board._id} className="board-title-options flex align-center">
          {!isEditing && <span className="board-title-span">{board.title}</span>}

          {isEditing && (
            <EditableText
              boardId={boardToEdit._id}
              prevTxt={boardToEdit.title}
              className={'board-title-input'}
              setBoardToEdit={setBoardToEdit}
              func={onEditBoardTitle}
              isFocused={true}
            />
          )}

          <button
            className={`options-menu-btn justify-center align-center ${openMenuClass}`}
            onClick={handleOptionsClick}
            ref={menuBtnRef}
          >
            <Options />
          </button>
        </div>
      </article>
    </NavLink>
  )
}
