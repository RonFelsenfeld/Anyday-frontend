import { useSelector } from 'react-redux'
import { useRef } from 'react'

import { ArrowDown, ArrowRight, PlusIcon, WorkSpaceOption } from '../services/svg.service'
import { saveGroup } from '../store/actions/board.actions'
import { hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'

import { EditableText } from './EditableText'
import { BOTTOM_LEFT } from '../store/reducers/system.reducer'
import { boardService } from '../services/board.service'

export function GroupHeader({
  group,
  isHeaderExpanded,
  onRemoveGroup,
  setGroupToEdit,
  groupToEdit,
  isExpanded,
  toggleIsExpanded,
}) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const groupHeaderRef = useRef()
  const sentinelRef = useRef()

  // useSecondRender(createObserver)

  // function createObserver() {
  //   const groupHeaderObserver = new IntersectionObserver(handleIntersection, {
  //     root: groupHeaderRef.current,
  //     threshold: 0.9999,
  //   })

  //   groupHeaderObserver.observe(sentinelRef.current)

  //   function handleIntersection(entries) {
  //     entries.forEach(entry => {
  //       const { isIntersecting } = entry
  //       console.log(isIntersecting)
  //     })
  //   }

  //   return () => {
  //     groupHeaderObserver.disconnect()
  //   }
  // }

  async function onEditGroupTitle(newTitle) {
    if (!newTitle) return
    groupToEdit.title = newTitle

    try {
      await saveGroup(board, groupToEdit)
      setGroupToEdit(null)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onEditGroupColor(newColor) {
    groupToEdit.style.color = newColor

    try {
      await saveGroup(board, groupToEdit)
      setGroupToEdit(null)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  function handleColorPickerClick({ currentTarget }) {
    const cmpInfo = {
      type: 'colorPicker',
      options: boardService.getGroupColors(),
      submitFunc: onEditGroupColor,
    }

    showModal(currentTarget, BOTTOM_LEFT, cmpInfo, false)
  }

  function isEditingCurrGroup(group) {
    return groupToEdit?.id === group.id
  }

  return (
    <header className={`group-header ${isHeaderExpanded ? 'expanded' : ''}`} ref={groupHeaderRef}>
      {/* <div className="sentinel" ref={sentinelRef}></div> */}

      <div className="group-title-container flex align-center">
        <button className="board-menu-btn" onClick={() => onRemoveGroup(group.id)}>
          <WorkSpaceOption />
        </button>

        <button
          className="collapse-btn"
          style={{ color: group.style.color }}
          onClick={toggleIsExpanded}
        >
          {isExpanded ? <ArrowDown /> : <ArrowRight />}
        </button>

        <h2
          style={{ color: group.style.color }}
          onClick={() => {
            setGroupToEdit(group)
            hideToolTip()
          }}
          onMouseEnter={ev => showToolTip(ev.target, 'Click to edit')}
          onMouseLeave={() => hideToolTip()} // ! MOVE BELOW HEADING
          className="group-title"
        >
          {!isEditingCurrGroup(group) && group.title}
          {isEditingCurrGroup(group) && (
            <div className="group-title-edit-container flex align-center">
              <EditableText
                prevTxt={group.title}
                func={onEditGroupTitle}
                className={'group-title-input'}
                isFocused={true}
                isSubmitOnBlur={false}
                btnInfo={{
                  className: 'btn-change-group-color',
                  style: { backgroundColor: group.style.color },
                  onClick: handleColorPickerClick,
                }}
              />
            </div>
          )}
        </h2>

        <h2 className="tasks-left">{`${group.tasks.length} Tasks`}</h2>
      </div>

      <li className="group-first-row">
        <div className="task-indicator" style={{ backgroundColor: group.style.color }}></div>
        <input type="checkbox" name="all-tasks" />
        <h3>Task</h3>
        {board.cmpsOrder.map((cmp, idx) => (
          <h3 key={idx}>{boardService.getColTitle(cmp)}</h3>
        ))}
        <h3 className="add-col-btn">
          <PlusIcon />
        </h3>
      </li>
    </header>
  )
}
