import { NavLink } from 'react-router-dom'
import { SidebarBoardPreview } from './SidebarBoardPreview'

export function SidebarBoardList({
  boards,
  onDeleteBoard,
  onEditBoardTitle,
  boardToEdit,
  setBoardToEdit,
}) {
  return (
    <ul className="side-bar-boards-list clean-list">
      {boards.map(board => (
        <NavLink className="navlink" to={`/board/${board._id}`} key={board._id}>
          <li key={board._id}>
            <SidebarBoardPreview
              boardToEdit={boardToEdit}
              setBoardToEdit={setBoardToEdit}
              board={board}
              onDeleteBoard={onDeleteBoard}
              onEditBoardTitle={onEditBoardTitle}
            />
          </li>
        </NavLink>
      ))}
    </ul>
  )
}
