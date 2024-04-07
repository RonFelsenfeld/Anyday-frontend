import { NavLink } from "react-router-dom";
import { MiniBoard, WorkSpaceOption } from "../services/svg.service";

export function SidebarBoardPreview({ board, editBoardName, deleteBoard }) {

    return (
        <NavLink className="navlink" to={`/board/${board._id}`} key={board._id}>
            <article className="board-li flex align-center">
                <MiniBoard className="mini-board-svg" />
                <div key={board._id} className="board-title-options flex align-center">
                    <span className="board-title-span">{board.title}</span>
                    <button
                        onClick={() => deleteBoard(board._id)}
                        className="remove-board-btn btn"
                    >x</button>
                    <button
                        className="justify-center align-center"
                        // onClick={() => editBoardName(board._id)}
                        // onClick={onBoardOptionsClick}
                    ><WorkSpaceOption /></button>
                </div>
            </article>
        </NavLink>
    )
}