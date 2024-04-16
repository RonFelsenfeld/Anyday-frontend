import { useState } from 'react'
import { EditPencil } from '../services/svg.service'
import { hideModal } from '../store/actions/system.actions'
import { EditLabels } from './EditLabels'

export function DynamicLabelPicker({ options, submitFunc, styleFunc }) {
  const [isEditMode, setIsEditMode] = useState(false)

  if (isEditMode) return <EditLabels options={options}/>
  return (
    <article className="label-picker-container">
      <div className="options-container">
        {options.map(item => (
          <button
            style={styleFunc(item.id)}
            className="dialog-item"
            onClick={() => {
              submitFunc(item)
              hideModal()
            }}
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="btn-container">
        <button onClick={()=>setIsEditMode(true)} className="edit-labels-btn">
          <EditPencil /> Edit Labels
        </button>
      </div>
    </article>
  )
}
