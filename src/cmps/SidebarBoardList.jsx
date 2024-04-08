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
        <li key={board._id}>
          <SidebarBoardPreview
            boardToEdit={boardToEdit}
            setBoardToEdit={setBoardToEdit}
            board={board}
            onDeleteBoard={onDeleteBoard}
            onEditBoardTitle={onEditBoardTitle}
          />
        </li>
      ))}
    </ul>
  )
}
