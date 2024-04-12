import {
  AddGroup,
  ChangeColor,
  CollapseAll,
  CollapseThis,
  FavoriteSmall,
  Login,
  Logout,
  OpenTask,
  RenamePencil,
  Trash,
} from '../services/svg.service'
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

      case 'login':
        return <Login />

      case 'logout':
        return <Logout />
    }
  }

  function getOptionStyle({ title }) {
    if (title === 'Login') return { width: '100px' }
    if (title === 'Logout') return { width: '100px' }
    return { border: 'none' } // Just for the style get valid object
  }

  return (
    <article className="dynamic-options-menu">
      <ul
        className="options-list clean-list flex column
      "
      >
        {options.map((option, idx) => (
          <li
            key={`${option}${idx}`}
            className="option flex align-center"
            style={getOptionStyle(option)}
          >
            <button
              className="btn-option flex align-center"
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
