import { useState } from "react";
import { TaskEditModal } from "./TaskEditModal";
import { saveTask } from "../store/actions/board.actions";

export function TaskStatus({ board, setBoard, group, task }) {
    const [isOpenModal, setIsOpenModal] = useState(false)

    function getStatusBG(taskStatus) {
        const status = board.statuses?.find(s => s.title === taskStatus)
        return { backgroundColor: status?.color }
    }

    async function onUpdateTaskStatus(statusTitle) {
        const editedTask = { ...task, status: statusTitle }
        try {
            const savedBoard = await saveTask(board, group, editedTask)
            setIsOpenModal(false)
            setBoard(savedBoard)
        } catch (err) {
            console.log('Had issues updating task status')
        }
    }

    return <>
        <p onClick={() => setIsOpenModal(true)} style={getStatusBG(task.status)} className="task-status">
            {task.status ? task.status : ''}
        </p>
        {isOpenModal && <TaskEditModal arr={board.statuses} func={onUpdateTaskStatus} getStyle={getStatusBG}/>}
    </>
}