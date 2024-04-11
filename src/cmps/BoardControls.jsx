import { useState } from 'react'
import { Filter, Hide, RemovePersonFilter, Search, Sort, UserImg } from '../services/svg.service'
import { hideModal, hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'
import { setGroupTaskFilterBy } from '../store/actions/board.actions'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { boardService } from '../services/board.service'
// import { useSelector } from 'react-redux'

export function BoardControls() {
  const [isFilterInput, setIsFilterInput] = useState(false)
  // const markedTxt = useSelector(storeState => storeState.boardModule.markedTxt)
  const board = useSelector(stateStore => stateStore.boardModule.currentBoard)
  const filterBy = useSelector(stateStore => stateStore.boardModule.groupTaskFilterBy)


  function onSetGroupTaskFilterBy(groupTaskFilterBy) {
    setGroupTaskFilterBy(groupTaskFilterBy)
  }

  function onAddPerson(personId) {
    console.log('added', personId);

    setGroupTaskFilterBy({ ...filterBy, person: personId })
    hideModal()
  }

  function onRemovePersonFilter({ currentTarget }) {
    // currentTarget.stopPropagation()

    setGroupTaskFilterBy({ ...filterBy, person: null })
  }




  // console.log(filterBy);
  function handlePersonFilter({ currentTarget }) {
    const persons = board.persons
    const suggestedPersons = persons
    const cmpInfo = {
      type: 'filterPersonPicker',
      persons,
      suggestedPersons,
      onAddPerson,
      // onRemovePerson
    }
    // console.log(persons);
    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, false)
  }

  function handleChange({ target }) {
    const { value } = target
    onSetGroupTaskFilterBy({ txt: value })
    // markFilteredTxt(value)
  }


  const person = boardService.getPerson(board, filterBy.person)

  const dynFilterClass = filterBy.person ? 'active' : ''
  const dynCloseFilterPersonBtn = filterBy.person ? '' : 'hidden'
  return (
    <section className="board-controls flex align-baseline">
      <button className="btn btn-new-task">New task</button>

      <div className='filter-sort-btns flex align-center'>
        {!isFilterInput && <button
          onClick={() => setIsFilterInput(true)}
          className="btn btn-action flex align-center">
          <Search />
          <span className="btn-title">Search</span>
        </button>}
        {isFilterInput &&
          <form className='filter-form flex'>
            <Search />
            <input
              onChange={handleChange}
              type='text'
              placeholder='Search this board '
              onBlur={() => setIsFilterInput(false)}
            />
          </form>
        }


        <div className={`filter-by-person-container flex align-center ${dynFilterClass}`}>
          <button
            className={`btn btn-action flex align-center `}
            onMouseEnter={ev => showToolTip(ev.target, 'Filter board by person')}
            onMouseLeave={() => hideToolTip()}
            onClick={handlePersonFilter}
          >
            {!filterBy.person && <div className=" flex filter-not-active">
              <UserImg />
              <span className="btn-title">Person</span>
            </div>
            }
            {filterBy.person &&
              <div className='filter-active flex align-center'>
                <img className="filterby-img" src={`${person.imgUrl}`} />
                <span className="btn-title">Person</span>
              </div>
            }
          </button>
          <div className={`removing-person ${dynCloseFilterPersonBtn}`} onClick={onRemovePersonFilter}><RemovePersonFilter /></div>
        </div>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Filter board by anything')}
          onMouseLeave={() => hideToolTip()}
        >
          <Filter />
          <span className="btn-title">Filter</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Sort board by any column')}
          onMouseLeave={() => hideToolTip()}
        >
          <Sort />
          <span className="btn-title">Sort</span>
        </button>

        <button
          className="btn btn-action flex align-center"
          onMouseEnter={ev => showToolTip(ev.target, 'Hidden columns')}
          onMouseLeave={() => hideToolTip()}
        >
          <Hide />
          <span className="btn-title">Hide</span>
        </button>
      </div>
    </section>
  )
}
