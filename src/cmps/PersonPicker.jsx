import { SmallSearchIcon, Xbutton } from '../services/svg.service'
import { utilService } from '../services/util.service'

export function PersonPicker({ taskPersons, suggestedPersons, onAddPerson, onRemovePerson }) {
  console.log(suggestedPersons)
  return (
    <div className="person-edit-modal">
      <ul className="task-persons clean-list">
        {taskPersons?.map(person => {
          return (
            <li key={person.id} className="task-person">
              {person.imgUrl ?
                <img className="person-img" src={person.imgUrl} alt="" /> :
                <div key={person.id} className="person-initials">
                  {utilService.getInitials(person.fullName)}
                </div>
              }
              <h4 className="person-name">{person.fullName}</h4>
              <button onClick={() => onRemovePerson(person.id)} className="delete-person-btn">
                <Xbutton />
              </button>
            </li>
          )
        })}
      </ul>
      <form className="search-person-form">
        <input className="search-person-input" type="text" placeholder="Search names"></input>
        <button className="search-btn">
          <SmallSearchIcon />
        </button>
      </form>
      <h3 className="suggested-people-title">Suggested people</h3>
      <ul className="suggested-people-list clean-list">
        {suggestedPersons?.map(person => {
          return (
            <li key={person.id} onClick={() => onAddPerson(person.id)} className="suggested-person">
              {person.imgUrl ? <img className="suggested-person-img" src={person.imgUrl} alt=""/> :
                <div key={person.id} className="person-initials">
                  {utilService.getInitials(person.fullName)}
                </div>
              }
              <h4 className="suggested-person-name">{person.fullName}</h4>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
