import React from "react";
import { ArrowRight, CommentClock, DateActivity, StatusPriority, UserImg } from "../services/svg.service";
import { utilService } from "../services/util.service";

export function Activity({ activity, selectedTask }) {

    return (
        <div className="activity">
            <div className="time flex align-center" >
                <CommentClock />
                <span className="time-desc">{utilService.calcPastTimeActivity(activity.createdAt)}</span>
            </div>
            {activity.byPerson.imgUrl ?
                <img className="user-img" src={activity.byPerson.imgUrl} alt="user-image" /> :
                <div className="user-initials">{utilService.getInitials(activity.byPerson.fullName)}</div>
            }
            <span className="task-title">{selectedTask.title}</span>

            {
                activity.action === 'Priority' &&
                <>
                    <div className="action flex align-center">
                        <StatusPriority />
                        <span className="activity-action">{activity.action}</span>
                    </div>
                    <div style={{ backgroundColor: activity.from?.color }} className="from flex align-center justify-center">{activity.from?.title}</div>
                    <ArrowRight />
                    <div style={{ backgroundColor: activity.to?.color }} className="to flex align-center justify-center">{activity.to?.title}</div>
                </>
            }

            {activity.action === 'Status' &&
                <React.Fragment>
                    <div className="action flex align-center">
                        <StatusPriority />
                        <span className="activity-action">{activity.action}</span>
                    </div>
                    <div style={{ backgroundColor: activity.from?.color }} className="from flex align-center justify-center">{activity.from?.title}</div>
                    <ArrowRight />
                    <div style={{ backgroundColor: activity.to?.color }} className="to flex align-center justify-center">{activity.to?.title}</div>
                </React.Fragment>}


            {activity.action === 'Person' &&
                <React.Fragment>
                    <div className="action flex align-center">
                        <UserImg />
                        <span className="activity-action">{activity.action}</span>
                    </div>
                    <div className="person-action flex align-center justify-center">{activity.title}</div>
                    <ArrowRight />
                    <img className="add-person" src={activity.to?.imgUrl} alt="" />
                </React.Fragment>

            }

            {activity.action === 'Timeline' &&
                <React.Fragment>
                    <div className="action flex align-center">
                        <DateActivity />
                        <span className="activity-action">{activity.action}</span>
                    </div>
                    <div style={{ backgroundColor: activity.color }} className="timeline-action flex align-center justify-center">{activity.oldTimeLine ? utilService.getFormattedTimeline(activity.oldTimeLine?.startDate, activity.oldTimeLine?.dueDate) : "-"}</div>
                    <ArrowRight />
                    <div style={{ backgroundColor: activity.color }} className="timeline-action flex align-center justify-center">{utilService.getFormattedTimeline(activity.newTimeLine?.startDate, activity.newTimeLine?.dueDate)}</div>
                </React.Fragment>
            }

            {activity.action === 'Files' &&
                <React.Fragment>
                    <div className="action flex align-center">
                        <img className="file-img" src="/assets/img/file-svg.svg" alt="" />
                        <span className="activity-action">{activity.action}</span>
                    </div>
                    <div>{activity.title}</div>
                </React.Fragment>
            }
        </div >
    )
}