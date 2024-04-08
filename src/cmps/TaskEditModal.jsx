import { EditPencil } from '../services/svg.service'

export function TaskEditModal({ arr, func, getStyle='', isMenu=false }) {
  return (
    <dialog open>
      <div className="options-container">
        {arr.map(item => (
          <button
            style={getStyle(item.title)}
            type="dialog"
            className="dialog-item"
            onClick={() => func(item.title)}
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>

      {!isMenu && <div className="btn-container">
        <button className="edit-labels-btn">
          <EditPencil /> Edit Labels
        </button>
      </div>}
    </dialog>
  )
}