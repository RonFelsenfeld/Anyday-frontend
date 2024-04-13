import { CommentClock, UserImg } from "../services/svg.service";
import { utilService } from "../services/util.service";

export function Activity({ selectedTask, activity }) {

    

    // console.log(selectedTask);
    return (
        <div className="activity flex align-center justify-around">
            <div className="time flex align-center" >
                <CommentClock />
                <span className="time-desc">{utilService.calcPastTimeActivity(activity.createdAt)}</span>
            </div>
            <img className="user-img" src={activity.byPerson.imgUrl} alt="user-image" />
            <span className="task-title">{activity.byPerson.fullName}</span>
            <div className="action-type flex align-center ">
                <div className="flex align-center">
                </div>
                <div className="action flex align-center">
                    <span className="activity-action">{activity.action}</span>
                </div>
            </div>
        </div>
    )
}