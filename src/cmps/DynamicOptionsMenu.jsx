import { AddGroup, ChangeColor, CollapseAll, CollapseThis, FavoriteSmall, OpenTask, RenamePencil, Trash } from '../services/svg.service'
import { hideModal } from '../store/actions/system.actions'

export function DynamicOptionsMenu({ options }) {
  function getSvg(iconName) {
    switch (iconName) {
      case 'pencil':
        return <RenamePencil />

      case 'trash':
        return <Trash />

      case 'favorite':
        return <FavoriteSmall />

      case 'collapseThis':
        return <CollapseThis />

      case 'collapseAll':
        return <CollapseAll />

      case 'addGroup':
        return <AddGroup />

      case 'changeColor':
        return <ChangeColor />

      case 'openTask':
        return <OpenTask />
    }
  }

  return (
    <article className="dynamic-options-menu">
      <ul
        className="options-list clean-list flex column
      "
      >
        {options.map((option, idx) => (
          <li key={`${option}${idx}`} className="option flex align-center">
            <button
              className="btn-option flex"
              onClick={() => {
                option.func()
                hideModal()
              }}
            >
              <span>{getSvg(option.icon)}</span>
              <span className="option-title">{option.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
