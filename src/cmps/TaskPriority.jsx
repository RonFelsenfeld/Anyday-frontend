import { useState } from "react"
import { TaskEditModal } from "./TaskEditModal"
import { saveTask } from "../store/actions/board.actions"

export function TaskPriority({ board, setBoard, group, task }) {
    const [isOpenModal, setIsOpenModal] = useState(false)

    function getPriorityBG(taskPriority) {

        const priority = board.priorities?.find(p => p.title === taskPriority)
        return { backgroundColor: priority?.color }
    }

    async function onUpdateTaskPriority(priorityTitle) {
        const editedTask = { ...task, priority: priorityTitle }
        try {
            const savedBoard = await saveTask(board, group, editedTask)
            setIsOpenModal(false)
            setBoard(savedBoard)
        } catch (err) {
            console.log('Had issues updating task status')
        }
    }

    return <>
        <p onClick={() => setIsOpenModal(true)} style={getPriorityBG(task?.priority || '')} className="task-priority">
            {task?.priority ? task.priority : ''}
        </p>
        {isOpenModal && <TaskEditModal arr={board.priorities} func={onUpdateTaskPriority} getStyle={getPriorityBG}/>}
    </>
}