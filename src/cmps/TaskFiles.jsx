import { useSelector } from "react-redux";
import { uploadFile } from "../services/cloudinary-service";
import { saveTask } from "../store/actions/board.actions";
import { useState } from "react";
import { utilService } from "../services/util.service";

export function TaskFiles({ group, task }) {
    const board = useSelector(stateStore => stateStore.boardModule.currentBoard)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const guest = { fullName: 'Guest', imgUrl: '/assets/img/user-avatar.svg', id: 'guest101' }
    const [isLoading, setIsLoading] = useState(false)

    async function onAddFile(ev) {
        const currActivity = { id: utilService.makeId(), byPerson: user || guest, action: `Updated a file`, createdAt: Date.now() }

        try {
            setIsLoading(true)
            const url = await uploadFile(ev)

            const updatedTask = task.files ?
                { ...task, files: [...task.files, { type: 'url', url }] } : { ...task, files: [{ type: 'url', url }], activities: [...task.activities, currActivity] }

            await saveTask(board, group, updatedTask)

            setIsLoading(false)
        } catch (err) {
            console.log('Had issues adding file', err)
        }
    }

    async function onRemoveFile() {
        const currActivity = { id: utilService.makeId(), byPerson: user || guest, action: `Updated a file`, createdAt: Date.now() }

        try {
            const updatedTask = { ...task, files: [], activities: [...task.activities, currActivity] }
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
                    <button onClick={onRemoveFile} className="delete-file-btn fa-solid x-mark"></button>
                </> :
                <img className="empty-file-icon" src="https://cdn.monday.com/images/file-types/empty.svg" alt="No File"></img>}
            <input hidden onChange={onAddFile} id="file-upload" type="file"></input>
        </label>
    </div>
}