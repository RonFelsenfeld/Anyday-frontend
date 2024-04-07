import { EditPencil } from "../services/svg.service"

export function TaskEditModal({ arr, func, getStyle }) {
    return <dialog open>
        <div className="options-container">
            {arr.map(el =>
                <button
                    style={getStyle(el.title)} type="dailog"
                    className="dialog-item"
                    onClick={() => func(el.title)}
                    key={el.id}>{el.title}
                </button>)}
        </div>

        <div className="btn-container">
            <button className="edit-labels-btn"><EditPencil /> Edit Labels</button>
        </div>
    </dialog>
}