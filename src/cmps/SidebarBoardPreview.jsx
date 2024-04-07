import { NavLink } from "react-router-dom";
import { MiniBoard, WorkSpaceOption } from "../services/svg.service";
import { EditableText } from "./EditableText";
import { useState } from "react";

export function SidebarBoardPreview({ board, editBoardName, deleteBoard, setBoardToEdit, boardToEdit }) {
    // if (boardToEdit) console.log(boardToEdit._id);
    return (
        <NavLink className="navlink" to={`/board/${board._id}`} key={board._id}>
            <article className="board-li flex align-center">
                <MiniBoard className="mini-board-svg" />
                <div key={board._id} className="board-title-options flex align-center">
                    {boardToEdit?._id !== board._id && <span className="board-title-span">{board.title}</span>}
                    {boardToEdit?._id === board._id && < EditableText
                        boardId={boardToEdit._id}
                        prevTxt={boardToEdit.title}
                        className={"board-title-input"}
                        setBoardToEdit={setBoardToEdit}
                        func={editBoardName}
                    // editBoardName={editBoardName}
                    />}
                    <button
                        onClick={() => deleteBoard(board._id)}
                        className="remove-board-btn btn">x</button>
                    <button className="justify-center align-center"
                        onClick={() => {
                            setBoardToEdit(board)
                            { boardToEdit && editBoardName(boardToEdit._id, boardToEdit.title) }
                        }}
                    // onClick={onBoardOptionsClick}
                    ><WorkSpaceOption /></button>
                </div>
            </article>
        </NavLink >
    )
}