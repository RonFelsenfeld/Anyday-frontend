import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

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
  idx,
  draggableDOMref,
}) {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)
  const [isHeaderIntersecting, setIsHeaderIntersecting] = useState(false)
  const groupHeaderRef = useRef()
  const sentinelRef = useRef()

  useEffect(() => {
    const headerObserver = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-233px 0px 0px 0px',
      threshold: 0,
    })

    headerObserver.observe(sentinelRef.current)

    function handleIntersection(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry
        setIsHeaderIntersecting(isIntersecting)
      })
    }

    return () => {
      headerObserver.disconnect()
    }
  }, [])

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

  function getClassList(snapshot) {
    let classList = ''

    if (!isExpanded) classList += 'collapsed '
    if (snapshot.isDragging) classList += 'dragging '
    if (!isHeaderIntersecting) classList += 'intersecting'

    return classList
  }

  return (
    <Draggable key={group.id} draggableId={group.id} index={idx}>
      {(provider, snapshot) => (
        <>
          <div className="group-header-sentinel flex" ref={sentinelRef}></div>

          <div
            className={`header-container ${isHeaderExpanded ? 'header-expanded' : ''}`}
            ref={groupHeaderRef}
          >
            <header
              {...provider.draggableProps}
              {...provider.dragHandleProps}
              className={`group-header ${getClassList(snapshot)}`}
              ref={el => {
                provider.innerRef(el)
                if (snapshot.isDragging) {
                  draggableDOMref.current = el
                }
              }}
            >
              {!isExpanded && (
                <div
                  className="list-indicator"
                  style={{
                    backgroundColor: group.style.color,
                  }}
                ></div>
              )}
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
                  onMouseEnter={ev => isExpanded && showToolTip(ev.target, 'Click to edit')}
                  onMouseLeave={() => isExpanded && hideToolTip()} // ! MOVE BELOW HEADING
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

              {isExpanded && (
                <li className="group-first-row">
                  <div
                    className="task-indicator"
                    style={{ backgroundColor: group.style.color }}
                  ></div>
                  <input type="checkbox" name="all-tasks" />
                  <h3>Task</h3>
                  {board.cmpsOrder.map((cmp, idx) => (
                    <h3 key={idx}>{boardService.getColTitle(cmp)}</h3>
                  ))}
                  <h3 className="add-col-btn">
                    <PlusIcon />
                  </h3>
                </li>
              )}
            </header>
          </div>
        </>
      )}
    </Draggable>
  )
}
