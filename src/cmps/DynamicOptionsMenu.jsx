import { useState } from 'react'
import {
  AddGroup,
  ArrowRight,
  ChangeColor,
  CollapseAll,
  CollapseThis,
  FavoriteSmall,
  Gmail,
  GoogleCalender,
  Login,
  Logout,
  OpenTask,
  RenamePencil,
  Trash,
} from '../services/svg.service'

import { hideModal } from '../store/actions/system.actions'
import { DynamicShareToPersonPicker } from './DynamicShareToPersonPicker'

export function DynamicOptionsMenu({ options }) {
  const [isPersonMenuOpen, setIsPersonMenuOpen] = useState(false)
  const [selectedShareOption, setSelectedShareOption] = useState(null)

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

      case 'whatsapp':
        return <img src="/assets/img/whatsapp.svg" alt="Whataspp icon" className="whatsapp-icon" />

      case 'gmail':
        return (
          <div className="flex align-center">
            <Gmail />
          </div>
        )

      case 'calender':
        return (
          <div className="flex align-center">
            <GoogleCalender />
          </div>
        )
    }
  }

  function handleOptionClick(option) {
    const { title } = option
    if (title !== 'Share on Whatsapp' && title !== 'Send as mail') {
      option.func()
      return hideModal()
    }

    setSelectedShareOption(option)
    setIsPersonMenuOpen(true)
  }

  function isShareOption({ icon }) {
    return icon === 'whatsapp' || icon === 'gmail'
  }

  function getOptionStyle({ title }) {
    if (title === 'Login') return { width: '100px' }
    if (title === 'Logout') return { width: '100px' }
    if (title === 'Delete Board') return { width: '150px' }
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
            className="option flex align-center justify-between"
            style={getOptionStyle(option)}
            onClick={() => handleOptionClick(option)}
          >
            <button className="btn-option flex">
              <div className="flex align-center">
                <span>{getSvg(option.icon)}</span>
                <span className="option-title">{option.title}</span>
              </div>
            </button>

            {isShareOption(option) && (
              <div className="whatsapp-arrow flex align-center">
                <ArrowRight />
              </div>
            )}
          </li>
        ))}
      </ul>

      {isPersonMenuOpen && (
        <DynamicShareToPersonPicker
          options={options}
          setIsPersonMenuOpen={setIsPersonMenuOpen}
          selectedShareOption={selectedShareOption}
        />
      )}
    </article>
  )
}
