import { NavLink } from 'react-router-dom'
import { MiniBoard, WorkSpaceOption } from '../services/svg.service'
import { EditableText } from './EditableText'

export function SidebarBoardPreview({
  board,
  onEditBoardTitle,
  onDeleteBoard,
  setBoardToEdit,
  boardToEdit,
}) {
  const isEditing = boardToEdit?._id === board._id

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
            />
          )}

          <button onClick={() => onDeleteBoard(board._id)} className="remove-board-btn btn">
            x
          </button>

          <button
            className="justify-center align-center"
            onClick={() => {
              setBoardToEdit(board)
            }}
          >
            <WorkSpaceOption />
          </button>
        </div>
      </article>
    </NavLink>
  )
}
