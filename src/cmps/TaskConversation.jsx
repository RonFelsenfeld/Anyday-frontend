import { useState } from "react";
import { CommentClock } from "../services/svg.service";
import { utilService } from "../services/util.service";
import { boardService } from "../services/board.service";

export function TaskConversation({ selectedTask }) {
    const [currComment, setCurrComment] = useState(boardService.getEmptyComment())

    function handleChange({ target }) {
        setCurrComment(target.value)
    }

    function addMsg(ev) {
        ev.preventDefault()
        console.log(currComment);
    }

    return (
        <div className="update-log-content">
            <form className="input-btn flex column" onSubmit={addMsg}>
                <div className="updates-log-txt-area">
                    <input autoFocus onChange={handleChange} className="txt-input-update-log" type="text" placeholder="Write an update..." value={currComment} />
                </div>
                <button className="update-btn">Update</button>
            </form>
            {selectedTask &&
                <ul className="comments-list clean-list">
                    {
                        selectedTask.comments.map(comment => <li key={comment.id}>
                            <div className="comment-container">
                                <div className="comment-header flex justify-between align-center">
                                    <div className="img-name-connected flex align-center">
                                        <img className="user-img" src={`${comment.byPerson.imgUrl}`} />
                                        <span className="user-name">{`${comment.byPerson.fullName}`}</span>
                                        <div className="is-connected"></div>
                                    </div>
                                    <div className="clock-side flex">
                                        <CommentClock />
                                        <span>{utilService.calcPastTime(comment.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="comment-body">
                                    <p className="comment-txt flex">{comment.txt}</p>
                                </div>
                            </div>
                        </li>
                        )}
                </ul>}
        </div>
    )
}