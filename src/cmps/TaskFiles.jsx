import { useSelector } from "react-redux";
import { uploadFile } from "../services/cloudinary-service";
import { saveTask } from "../store/actions/board.actions";
import { useState } from "react";

export function TaskFiles({ group, task }) {
    const board = useSelector(stateStore => stateStore.boardModule.currentBoard)
    const [isLoading, setIsLoading] = useState(false)

    async function onAddFile(ev) {
        try {
            setIsLoading(true)
            const url = await uploadFile(ev)

            const updatedTask = task.files ?
                { ...task, files: [...task.files, { type: 'url', url }] } : { ...task, files: [{ type: 'url', url }] }

            await saveTask(board, group, updatedTask)

            setIsLoading(false)
        } catch (err) {
            console.log('Had issues adding file', err)
        }
    }

    async function onRemoveFile() {
        try {
            const updatedTask = { ...task, files: [] }
            console.log('updatedTask', updatedTask)
            await saveTask(board, group, updatedTask)
        } catch (err) {
            console.log(err)
        }
    }

    const buttonPosition = task.files?.length ? {} : { transform: 'translateX(47px)' }

    if (isLoading) return <div className="task-row task-files loader-container-files"><div className="loader"></div></div>
    return <div className="task-row task-files">
        <label htmlFor="file-upload" className="files-container">
            <button style={buttonPosition} className="add-file-btn fa-solid plus"></button>
            {task.files?.length ?
                <>
                    <img alt="" className="file-type-icon" src="https://cdn.monday.com/images/file-types/v2-link.svg"></img>
                    <button onClick={onRemoveFile}className="delete-file-btn fa-solid x-mark"></button>
                </> :
                <img className="empty-file-icon" src="https://cdn.monday.com/images/file-types/empty.svg" alt="No File"></img>}
            <input hidden onChange={onAddFile} id="file-upload" type="file"></input>
        </label>
    </div>
}