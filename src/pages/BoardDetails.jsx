import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { boardService } from '../services/board.service'
import { loadBoard, removeGroup, saveGroup } from '../store/actions/board.actions'
import { AddBoardBtn, ArrowDown, WorkSpaceOption } from '../services/svg.service'
import { hideToolTip, showModal, showToolTip } from '../store/actions/system.actions'
import { BOTTOM_LEFT } from '../store/reducers/system.reducer'
import { SET_BOARD } from '../store/reducers/board.reducer'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'
import { UpdateLog } from '../cmps/UpdateLog'
import { Loader } from '../cmps/Loader'
import { EditableText } from '../cmps/EditableText'

export function BoardDetails() {
  const board = useSelector(storeState => storeState.boardModule.currentBoard)

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)
  const [isUpdateLogExpanded, setIsUpdateLogExpanded] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [groupToEdit, setGroupToEdit] = useState(null)

  const headerRef = useRef()
  const boardDetailsRef = useRef()

  const { boardId } = useParams()
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  useEffect(() => {
    if (boardId) loadBoard(boardId)

    return () => dispatch({ type: SET_BOARD, board: null })
  }, [boardId])

  useEffect(() => {
    if (!headerRef.current || !boardDetailsRef.current) return

    const headerObserver = new IntersectionObserver(handleIntersection, {
      root: boardDetailsRef.current,
      threshold: 0.99999,
    })

    headerObserver.observe(headerRef.current)

    function handleIntersection(entries) {
      entries.forEach(entry => {
        const { isIntersecting } = entry
        setIsHeaderExpanded(isIntersecting)
      })
    }

    document.title = `(${boardService.getTotalTasksByBoard(board)}) ${board.title}`

    return () => {
      headerObserver.disconnect()
    }
  }, [board])

  async function onAddGroup() {
    const newGroup = boardService.getEmptyGroup()
    try {
      const savedBoard = await saveGroup(board, newGroup)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onRemoveGroup(groupId) {
    try {
      const savedBoard = await removeGroup(board, groupId)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues removing group', err)
    }
  }

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

  function isEditingCurrGroup(group) {
    return groupToEdit?.id === group.id
  }

  function handleColorPickerClick({ currentTarget }) {
    const cmpInfo = {
      type: 'colorPicker',
      options: boardService.getGroupColors(),
      submitFunc: onEditGroupColor,
    }

    showModal(currentTarget, BOTTOM_LEFT, cmpInfo, false)
  }

  if (!board) return <Loader />
  return (
    <section className="board-details" ref={boardDetailsRef}>
      <UpdateLog
        board={board}
        selectedTask={selectedTask}
        setIsUpdateLogExpanded={setIsUpdateLogExpanded}
        isUpdateLogExpanded={isUpdateLogExpanded}
      />

      <div ref={headerRef}>
        <BoardHeader
          board={board}
          isHeaderExpanded={isHeaderExpanded}
          setIsHeaderExpanded={setIsHeaderExpanded}
        />
      </div>

      <div className="group-container">
        {board.groups.map(group => {
          return (
            <article key={group.id} className="board-group">
              <div className="group-header">
                <button className="board-menu-btn" onClick={() => onRemoveGroup(group.id)}>
                  <WorkSpaceOption />
                </button>

                <button className="collapse-btn" style={{ color: group.style.color }}>
                  <ArrowDown />
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

              <div className="group-content">
                <TaskList
                  setSelectedTask={setSelectedTask}
                  isUpdateLogExpanded={isUpdateLogExpanded}
                  setIsUpdateLogExpanded={setIsUpdateLogExpanded}
                  group={group}
                />
              </div>
            </article>
          )
        })}
      </div>

      <button className="add-group-btn" onClick={onAddGroup}>
        <AddBoardBtn /> Add new group
      </button>
    </section>
  )
}
