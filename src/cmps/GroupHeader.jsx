import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { ArrowDown, ArrowRight, PlusIcon, WorkSpaceOption } from '../services/svg.service'
import { saveGroup } from '../store/actions/board.actions'
import { hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'

import { EditableText } from './EditableText'
import { BOTTOM_LEFT, BOTTOM_RIGHT } from '../store/reducers/system.reducer'
import { boardService } from '../services/board.service'

export function GroupHeader({
  group,
  isHeaderExpanded,
  onAddGroup,
  onRemoveGroup,
  setGroupToEdit,
  groupToEdit,
  isExpanded,
  setIsExpanded,
  setIsAllGroupsExpended,
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

  function onMenuClick({ currentTarget }) {
    const cmpInfo = {
      type: 'optionsMenu',
      options: [
        {
          title: 'Collapse this group',
          icon: 'collapseThis',
          func: () => {
            setIsExpanded(false)
          },
        },
        {
          title: 'Collapse all groups',
          icon: 'collapseAll',
          func: () => {
            setIsAllGroupsExpended(false)
          },
        },
        {
          title: 'Add group',
          icon: 'addGroup',
          func: () => {
            onAddGroup()
          },
        },
        {
          title: 'Rename group',
          icon: 'pencil',
          func: () => {
            setGroupToEdit(group)
          },
        },
        {
          title: 'Change group color',
          icon: 'changeColor',
          func: () => {
            setGroupToEdit(group)
          },
        },
        {
          title: 'Delete',
          icon: 'trash',
          func: () => {
            onRemoveGroup(group.id)
          },
        },
      ],
    }

    showModal(currentTarget, BOTTOM_RIGHT, cmpInfo, false)
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
                <button className="group-menu-btn" onClick={onMenuClick}>
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
                  onMouseEnter={ev => isExpanded && showToolTip(ev.currentTarget, 'Click to edit')}
                  onMouseLeave={() => isExpanded && hideToolTip()}
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
                  <div className="checkbox-container flex align-center justify-center">
                    <input type="checkbox" name="all-tasks" />
                  </div>
                  <h3 className="task-title">Task</h3>
                  {board.cmpsOrder.map((cmp, idx) => (
                    <h3 className={boardService.getColTitle(cmp).toLowerCase()} key={idx}>
                      {boardService.getColTitle(cmp)}
                    </h3>
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
