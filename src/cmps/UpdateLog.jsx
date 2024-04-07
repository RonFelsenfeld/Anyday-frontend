import { useState } from 'react'
import { HomeUpdates, WorkSpaceOption, Xbutton } from "../services/svg.service";
import { boardService } from "../services/board.service";
import { Link } from "react-router-dom";




export function UpdateLog({ isUpdateLogExpanded, setIsUpdateLogExpanded, selectedTask, board }) {
    const [activeView, setActiveView] = useState('updates')

    function onCloseUpdateLog() {
        setIsUpdateLogExpanded(false)
    }

    function getIsActiveClass(view) {
        if (view === activeView) return 'active'
        return ''
    }

    const isOpenClass = isUpdateLogExpanded ? 'open' : ''


    if (!selectedTask) return
    return (
        <div className={`update-log-container ${isOpenClass}`}>
            <div className="header">
                <div className="title-container">
                    <div className="exit-button-container flex">
                        <Link to={`/board/${board._id}/`}><button onClick={onCloseUpdateLog}><Xbutton /></button></Link>
                    </div>
                    <div className="title-options flex justify-between">
                        <div className="title flex">
                            <h2>{selectedTask.title}</h2>
                        </div>
                        <div className="img-options flex">
                            <div className="user-img">
                                <p className="task-persons-img">
                                    {selectedTask.personsIds
                                        ? selectedTask.personsIds.map(id => <img key={id} src={`${boardService.getPersonUrl(board, id)}`} alt="" />)
                                        : ''}
                                </p>
                            </div>
                            <div>
                                <button className="menu-options-btn">
                                    <WorkSpaceOption />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="menu-options flex align-center">
                        <button
                            className={`btn-view updates-option flex align-center ${getIsActiveClass('updates')}`}
                            onClick={() => setActiveView('updates')}
                        >
                            <HomeUpdates />
                            <span className="updates">Updates</span>
                        </button>
                        <button
                            className={`btn-view files-option ${getIsActiveClass('files')}`}
                            onClick={() => setActiveView('files')}
                        >
                            <span>Files</span>
                        </button>
                        <button
                            className={`btn-view activity-log-option ${getIsActiveClass('activity')}`}
                            onClick={() => setActiveView('activity')}
                        >
                            <span>Activity Log</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="update-log-content">

                <div className="updates-log-txt-area">
                    <input className="txt-input-update-log" type="text" placeholder="Write an update..." />
                </div>
            </div>
        </div >
    )
}
