import { useSelector } from 'react-redux'

import { userService } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service'
import { whatsappService } from '../services/whatsapp.service'
import { hideModal } from '../store/actions/system.actions'
import { googleService } from '../services/google.service'

export function DynamicShareToPersonPicker({ options, setIsPersonMenuOpen, selectedShareOption }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const { persons } = board

  function handleSendToPerson(person) {
    const loggedInUser = userService.getLoggedInUser()
    if (!loggedInUser) return showErrorMsg('Login first')

    const { task } = selectedShareOption

    if (selectedShareOption.icon === 'whatsapp') {
      whatsappService.sendOnWhatsapp(loggedInUser, person, task)
    } else if (selectedShareOption.icon === 'gmail') {
      googleService.sendViaGmail(loggedInUser, person, task)
    }

    setIsPersonMenuOpen(false)
    hideModal()
  }

  function getCondition(person) {
    if (selectedShareOption.icon === 'whatsapp') return person.phoneNumber
    if (selectedShareOption.icon === 'gmail') return person.email
  }

  return (
    <section
      className="dynamic-share-to-person-picker"
      style={{ transform: selectedShareOption.icon === 'gmail' ? 'translateY(-55px)' : '' }}
    >
      <ul className="clean-list">
        {persons.map(person => {
          if (getCondition(person)) {
            return (
              <li
                key={person.id}
                className="person flex align-center"
                onClick={() => handleSendToPerson(person)}
              >
                <img
                  src={`${person.imgUrl || '/assets/img/user-avatar.svg'}`}
                  alt="User image"
                  className="person-img"
                />
                <span className="person-name">{person.fullName}</span>
              </li>
            )
          }
        })}
      </ul>
    </section>
  )
}
