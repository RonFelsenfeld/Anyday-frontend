import { SidebarBoardPreview } from "./SidebarBoardPreview";

export function SidebarBoardList({ boards, deleteBoard, editBoardName }) {

    return (
        <ul className="side-bar-boards-list clean-list">
            {boards.map(board => <li key={board._id}>
                <SidebarBoardPreview
                    board={board}
                    deleteBoard={deleteBoard}
                    editBoardName={editBoardName} />
            </li>)}
        </ul>
    )
}


