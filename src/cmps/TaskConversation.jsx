import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { CommentClock } from '../services/svg.service'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'

export function TaskConversation({ setSelectedTask, selectedTask, addMsg }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [currComment, setCurrComment] = useState(boardService.getEmptyComment())



    function handleChange({ target }) {
        setCurrComment(prev => ({ ...prev, txt: target.value, }))
    }

    function onAddMsg(ev) {
        ev.preventDefault()
        if (!currComment.txt) return
        //in the future:
        // if (loggedInUser) return

        const newComment = { ...currComment, createdAt: Date.now(), id: utilService.makeId(), byPerson: loggedInUser }
        console.log(newComment);
        setCurrComment(newComment)
        setSelectedTask(prev => ({ ...prev, comments: [...prev.comments, newComment] }))

        addMsg({ ...selectedTask, comments: [...selectedTask.comments, newComment] })
        setCurrComment(boardService.getEmptyComment())
    }

    return (
        <div className="update-log-content">
            <form className="input-btn flex column" onSubmit={onAddMsg}>
                <div className="updates-log-txt-area">
                    <input
                        autoFocus
                        onChange={handleChange}
                        className="txt-input-update-log"
                        type="text"
                        placeholder="Write an update..."
                        value={currComment.txt}
                    />
                </div>
                <button className="update-btn">Update</button>
            </form>

            {selectedTask.comments && !!selectedTask.comments?.length && (
                <ul className="comments-list clean-list">
                    {selectedTask.comments.map(comment => (
                        <li key={comment.id}>
                            <div className="comment-container">
                                <div className="comment-header flex justify-between align-center">
                                    <div className="img-name-connected flex align-center">
                                        {loggedInUser && <img className="user-img" src={`${comment.byPerson?.imgUrl}`} />}
                                        {loggedInUser &&<span className="user-name">{`${comment.byPerson?.fullName}`}</span>}
                                        {!loggedInUser && <img className="user-img" src='/assets/img/user-avatar.svg' />}
                                        {!loggedInUser &&<span className="user-name">Guest</span>}
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
                    ))}
                </ul>
            )}
        </div>
    )
}
