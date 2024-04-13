import { CommentClock, UserImg } from "../services/svg.service";
import { utilService } from "../services/util.service";

export function Activity({ board, selectedTask, taskGroup, activity }) {

    // console.log(selectedTask);
    return (
        <div className="activity flex align-center justify-between">
            <div className="time flex align-center" >
                <CommentClock />
                <span>{utilService.calcPastTimeActivity(selectedTask.createdAt)}</span>
            </div>
            <img className="user-img" src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg" alt="user-image" />
            <span className="task-title">{selectedTask.title}</span>
            {activity.action === 'Add person' &&
                <div className="action-type flex align-center">
                    <div className="flex align-center">
                        <UserImg />
                        <span className="btn-title">Person</span>
                    </div>
                    <div className="action flex align-center">
                        <span>{activity.action}</span>
                        {/* <img className="user-img" src={activity.personAdded.imgUrl} alt="user-image" /> */}
                    </div>
                </div>
            }

            {/* {activity.action === 'Add person' &&
                <div className="action-type flex align-center">
                    <div className="flex align-center">
                        <UserImg />
                        <span className="btn-title">Person</span>
                    </div>
                    <div className="action flex align-center">
                        <span>{activity.action}</span>
                        <img className="user-img" src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg" alt="user-image" />
                    </div>
                </div>
            } */}

        </div>
    )
}