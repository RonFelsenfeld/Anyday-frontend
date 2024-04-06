import { useState } from "react";
import { HomeUpdates, WorkSpaceOption } from "../services/svg.service";
import { boardService } from "../services/board.service";




export function UpdateLog({ isUpdateLogExpanded, setIsUpdateLogExpanded, selectedTask, board }) {
    const [isExpanded, setIsExpanded] = useState(true)



    function onCloseUpdateLog() {
        setIsUpdateLogExpanded(false)
    }


    const isOpenClass = !isUpdateLogExpanded ? 'closed' : ''

    if (!selectedTask) return 
    return <div className={`update-log-container ${isOpenClass}`}>
        <div className="header">
            <div className="title-container">
                <div className="exit-button-container flex">
                    <button onClick={onCloseUpdateLog}>x</button>
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
                    <div className="updates-option flex align-center">
                        <HomeUpdates />
                        <span>Updates</span>
                    </div>
                    <div className="files-option">
                        <span>Files</span>
                    </div>
                    <div className="activity-log-option">
                        <span>Activity Log</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="update-log-content">

            <div className="updates-log-txt-area">
                <input className="txt-input-update-log" type="text" placeholder="Write an update..." />
            </div>
        </div>
    </div>
}