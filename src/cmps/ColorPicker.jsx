import { hideModal } from '../store/actions/system.actions'

export function ColorPicker({ options, submitFunc, label }) {
  return (
    <article className="color-picker">
      <ul className="color-list  clean-list">
        {options.map((color, idx) => (
          <li key={`${color}${idx}`} className="color">
            <button
              onClick={() => {
                submitFunc(color, label)
                hideModal()
              }}
              className="btn-color"
              style={{ backgroundColor: color }}
            ></button>
          </li>
        ))}
      </ul>
    </article>
  )
}
