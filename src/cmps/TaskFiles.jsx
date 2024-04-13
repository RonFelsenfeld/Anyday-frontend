import { useSelector } from "react-redux";
import { uploadFile } from "../services/cloudinary-service";
import { saveTask } from "../store/actions/board.actions";
import { useRef, useState } from "react";
import { showModal } from "../store/actions/system.actions";
import { BOTTOM_CENTER } from "../store/reducers/system.reducer";

export function TaskFiles({ group, task }) {
    const board = useSelector(stateStore => stateStore.boardModule.currentBoard)
    const [isLoading, setIsLoading] = useState(false)
    const currTask = useRef(task)

    async function onAddFile(ev) {
        try {
            setIsLoading(true)
            const { url, format } = await uploadFile(ev)

            const updatedTask = task.files ?
                { ...task, files: [...task.files, { type: format, url }] } :
                { ...task, files: [{ type: format, url }] }

            await saveTask(board, group, updatedTask)

            setIsLoading(false)
        } catch (err) {
            console.log('Had issues adding file', err)
        }
    }

    async function onRemoveFile() {
        try {
            const updatedTask = { ...task, files: [] }
            await saveTask(board, group, updatedTask)
        } catch (err) {
            console.log(err)
        }
    }

    function onShowFile({ currentTarget }, file) {
        const cmpInfo = {
            type: 'FilePreview',
            file,
        }

        showModal(currentTarget, BOTTOM_CENTER, cmpInfo, false)
    }

    const buttonPosition = task.files?.length ? { left: '0' } : { left: '47px' }

    if (isLoading) return <div className="task-row task-files loader-container-files"><div className="loader"></div></div>
    return <div className="task-row task-files">
        {task.files?.length ?
            <div className="files-container flex">
                <label style={buttonPosition} htmlFor="file-upload" className="add-file-btn fa-solid plus">
                    {<input className="add-file-btn file-input" style={{opacity: '0', width: '100%', height: '100%'}}
                     onChange={onAddFile} id="file-upload" type="file"></input>}
                </label>
                {task.files.map(file => file.type === 'pdf' ?
                    <img key={file.url} onClick={({ currentTarget }) => onShowFile({ currentTarget }, file)}
                        className="file-type-icon" src="/assets/img/file-img.svg" alt="file icon" />
                    :
                    <img key={file.url} onClick={({ currentTarget }) => onShowFile({ currentTarget }, file)}
                        className="file-type-icon" src={file.url} alt="file preview image" />)}
                <button onClick={onRemoveFile} className="delete-file-btn fa-solid x-mark"></button>
            </div>
            :
            <label htmlFor="file-upload" className="files-container flex">
                <button style={buttonPosition} className="add-file-btn fa-solid plus"></button>
                <img className="empty-file-icon" src="https://cdn.monday.com/images/file-types/empty.svg" alt="No File"></img>
                <input className="add-file-btn file-input" style={{opacity: '0', width: '100%', height: '100%'}} 
                onChange={onAddFile} id="file-upload" type="file"></input>
            </label>
        }
    </div>
}