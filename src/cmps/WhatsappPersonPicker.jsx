import { useSelector } from 'react-redux'

import { userService } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service'
import { whatsappService } from '../services/whatsapp.service'

export function WhatsappPersonPicker({ options, setIsPersonMenuOpen }) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const { persons } = board

  function handleSendToPerson(person) {
    const loggedInUser = userService.getLoggedInUser()
    if (!loggedInUser) return showErrorMsg('Login first')

    // Extracting the whatsapp option, for getting the task
    const whatsappOption = options.find(option => option.icon === 'whatsapp')
    const { task } = whatsappOption

    whatsappService.sendOnWhatsapp(loggedInUser, person, task)
    setIsPersonMenuOpen(false)
  }

  return (
    <section className="whatsapp-person-picker">
      <ul className="clean-list">
        {persons.map(person => {
          if (person.phoneNumber) {
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
