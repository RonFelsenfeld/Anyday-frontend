import { EditPencil } from '../services/svg.service'
import { hideModal } from '../store/actions/system.actions'

export function DynamicLabelPicker({ options, submitFunc, styleFunc }) {
  return (
    <article className="label-picker-container">
      <div className="options-container">
        {options.map(item => (
          <button
            style={styleFunc(item.title)}
            className="dialog-item"
            onClick={() => {
              submitFunc(item.title)
              hideModal()
            }}
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="btn-container">
        <button className="edit-labels-btn">
          <EditPencil /> Edit Labels
        </button>
      </div>
    </article>
  )
}
