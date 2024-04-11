import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { ArrowDown, ArrowRight, PlusIcon, WorkSpaceOption } from '../services/svg.service'
import { saveGroup } from '../store/actions/board.actions'
import { hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'

import { EditableText } from './EditableText'
import { BOTTOM_LEFT, BOTTOM_RIGHT } from '../store/reducers/system.reducer'
import { boardService } from '../services/board.service'
import { useClickOutside } from '../customHooks/useClickOutside'

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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuBtnRef = useRef()

  useClickOutside(menuBtnRef, () => setIsMenuOpen(false))

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
    if (isHeaderExpanded) classList = 'header-expanded '
    if (!isExpanded) classList += 'collapsed '
    if (snapshot.isDragging) classList += 'dragging'

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
            setIsMenuOpen(false)
          }
        },
        {
          title: 'Collapse all groups',
          icon: 'collapseAll',
          func: () => {
            setIsAllGroupsExpended(false)
            setIsMenuOpen(false)
          }
        },
        {
          title: 'Add group',
          icon: 'addGroup',
          func: () => {
            onAddGroup()
            setIsMenuOpen(false)
          }
        },
        {
          title: 'Rename group',
          icon: 'pencil',
          func: () => {
            setGroupToEdit(group)
            setIsMenuOpen(false)
          }
        },
        {
          title: 'Change group color',
          icon: 'changeColor',
          func: () => {
            setGroupToEdit(group)
            setIsMenuOpen(false)
          }
        },
        {
          title: 'Delete',
          icon: 'trash',
          func: () => {
            onRemoveGroup(group.id)
            setIsMenuOpen(false)
          }
        }
      ]
    }

    showModal(currentTarget, BOTTOM_RIGHT, cmpInfo, false)
    setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
  }

  return (
    <Draggable key={group.id} draggableId={group.id} index={idx}>
      {(provider, snapshot) => (
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
            <button className="group-menu-btn"
              onClick={onMenuClick}
              ref={menuBtnRef}
            >
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
          )}
        </header>
      )}
    </Draggable>
  )
}
