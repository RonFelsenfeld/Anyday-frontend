import { utilService } from '../services/util.service'
import { hideToolTip, showToolTip } from '../store/actions/system.actions'

export function FilterPersonPicker({ suggestedPersons, onAddPerson }) {
  // console.log(suggestedPersons)
  return (
    <div className="filter-person-edit-modal flex column">
      <h3 className="suggested-people-title">Filter this board by Person</h3>
      <h5 className="suggested-people-subtitle">And find items they're working on. </h5>
      <ul className="suggested-people-list clean-list">
        {suggestedPersons?.map(person => {
          return (
            <li key={person.id} onClick={() => onAddPerson(person.id)} className="suggested-person">
              {person.imgUrl ? (
                <img
                  className="suggested-person-img"
                  src={`${person.imgUrl || '/assets/img/avatar-user'}`}
                  onMouseEnter={ev => showToolTip(ev.currentTarget, `${person.fullName}`)}
                  onMouseLeave={() => hideToolTip()}
                />
              ) : (
                <div
                  className="person-initials"
                  onMouseEnter={ev => showToolTip(ev.currentTarget, `${person.fullName}`)}
                  onMouseLeave={() => hideToolTip()}
                >
                  {utilService.getInitials(person.fullName)}
                </div>
              )}

              {/* <h4 className="suggested-person-name">{person.fullName}</h4> */}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
