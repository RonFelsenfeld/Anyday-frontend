import { CommentClock, UserImg } from "../services/svg.service";
import { utilService } from "../services/util.service";

export function Activity({ selectedTask, activity }) {

    // console.log(selectedTask);
    return (
        <div className="activity flex align-center justify-around">
            <div className="time flex align-center" >
                <CommentClock />
                <span>{utilService.calcPastTimeActivity(activity.createdAt)}</span>
            </div>
            <img className="user-img" src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg" alt="user-image" />
            <span className="task-title">{selectedTask.title}</span>
                <div className="action-type flex align-center ">
                    <div className="flex align-center">
                    </div>
                    <div className="action flex align-center">
                        <span>{activity.action}</span>
                    </div>
                </div>
        </div>
    )
}