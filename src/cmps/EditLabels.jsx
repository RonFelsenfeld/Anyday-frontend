import { useState } from "react"
import { boardService } from "../services/board.service"
import { showModal } from "../store/actions/system.actions"
import { BOTTOM_RIGHT } from "../store/reducers/system.reducer"
import { EditableText } from "./EditableText"
import { useSelector } from "react-redux"
import { saveBoard } from "../store/actions/board.actions"

export function EditLabels({ options }) {

    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    const [labelToEdit, setLabelToEdit] = useState(null)

    async function onUpdateLabelTitle(txt) {
        const updatedLabel = { ...labelToEdit, title: txt }
        const boardToSave = { ...board, statuses: [...board.statuses.map(s => s.id === labelToEdit.id ? updatedLabel : s)] }
        try {
            await saveBoard(boardToSave)
            setLabelToEdit(updatedLabel)
        } catch (err) {
            console.log('Had issues updating label', err)
        }
    }

    async function onUpdateLabelColor(color) {

        console.log('labelToEdit', labelToEdit)
        const updatedLabel = { ...labelToEdit, color }
        console.log('updatedLabel', updatedLabel)
        const boardToSave = { ...board, statuses: [...board.statuses.map(s => s.id === labelToEdit.id ? updatedLabel : s)] }
        try {
            await saveBoard(boardToSave)
            setLabelToEdit(updatedLabel)
        } catch (err) {
            console.log('Had issues updating label', err)
        }
    }

    function onOpenColorPicker({ currentTarget }) {
        // console.log('item', item)
        // setLabelToEdit(item)
        const cmpInfo = {
            type: 'colorPicker',
            options: boardService.getGroupColors(),
            submitFunc: onUpdateLabelColor,
        }

        showModal(currentTarget, BOTTOM_RIGHT, cmpInfo, false)
    }
    console.log('labelToEdit', labelToEdit)
    return <div className="edit-labels-container">

        {options.map(item => <div key={item.id}
            className="label-container flex"
            onClick={() => setLabelToEdit(item)}
        >
            {/* <button className='change-label-color-btn'
                style={{ backgroundColor: item.color }}
                onClick={(ev) => {
                    setLabelToEdit(item)
                    onOpenColorPicker(ev)
                }}>
            </button> */}

            <EditableText
                prevTxt={item.title}
                func={onUpdateLabelTitle}
                className={'edit-labels-form'}
                name={'label-title-input'}
            btnInfo={{
                className: 'change-label-color-btn',
                style: { backgroundColor: item.color },
                onClick: onOpenColorPicker,
            }}
            />
        </div>)}
    </div>
}