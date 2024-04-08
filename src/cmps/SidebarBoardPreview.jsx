import { NavLink } from 'react-router-dom'
import { MiniBoard, WorkSpaceOption } from '../services/svg.service'
import { EditableText } from './EditableText'
import { TaskEditModal } from './TaskEditModal'
import { useState } from 'react'

export function SidebarBoardPreview({
  board,
  onEditBoardTitle,
  onDeleteBoard,
  setBoardToEdit,
  boardToEdit,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const isEditing = boardToEdit?._id === board._id

  const menuOptions = [
    { id: 'delete101', title: 'Delete' }, {
      id: 'Rename101', title: 'Rename Board'
    }
  ]

  function menuOptionsPicker(title) {
    switch (title) {
      case "Delete":
        onDeleteBoard(board._id)
        

      case "Rename Board":
        setBoardToEdit(board)



    }
    setIsOpenModal(false)
  }

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

          {/* <button onClick={() => onDeleteBoard(board._id)} className="remove-board-btn btn">
            x
          </button> */}

          <button
            className="options-menu-btn justify-center align-center"
            onClick={() => {
              setIsOpenModal(prev => !prev)
              setBoardToEdit(board)
            }}
          >
            <WorkSpaceOption />
          </button>
          {isOpenModal && <TaskEditModal
            arr={menuOptions}
            func={menuOptionsPicker}
            isMenu={true}
            getStyle={{ color: 'black' }}
          />}
        </div>
      </article>
    </NavLink>
  )
}
