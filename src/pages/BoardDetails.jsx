import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

import { boardService } from '../services/board.service'

import { TaskList } from '../cmps/TaskList'
import { BoardHeader } from '../cmps/BoardHeader'
import { removeGroup, saveGroup } from '../store/actions/board.actions'
import { EditableText } from '../cmps/EditableText'
import { UpdateLog } from '../cmps/UpdateLog'
import { ArrowDown, WorkSpaceOption } from '../services/svg.service'

export function BoardDetails() {
  const [board, setBoard] = useState()
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)
  const [isUpdateLogExpanded, setIsUpdateLogExpanded] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)


  const headerRef = useRef()
  const boardDetailsRef = useRef()

  const { boardId } = useParams()
  const [isEditMode, setIsEditMode] = useState(false)
  const navigate = useNavigate()
  const editedGroupTitle = useRef(null)

  useEffect(() => {
    if (boardId) loadBoard()
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

    return () => {
      headerObserver.disconnect()
    }
  }, [board])

  async function loadBoard() {
    try {
      const board = await boardService.getById(boardId)
      setBoard(board)
    } catch (err) {
      console.log('Had issues loading board', err)
      navigate('/board')
    }
  }

  async function onAddGroup() {
    const newGroup = boardService.getEmptyGroup()
    try {
      const savedBoard = await saveGroup(board, newGroup)
      setBoard(savedBoard)
    } catch (err) {
      console.log('Had issues adding group', err)
    }
  }

  async function onEditGroupTitle(groupId) {
    const groupToEdit = boardService.getGroupById(board, groupId)
    console.log(groupToEdit);
    groupToEdit.title = prompt('Enter new title')
    if (!groupToEdit.title) return
    try {
      const savedBoard = await saveGroup(board, groupToEdit)
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

  const isUpdateLogOpenClass = !isUpdateLogExpanded ? 'closed' : ''

  if (!board) return <div>Loading...</div>
  return (
    <section className="board-details" ref={boardDetailsRef}>
      <div className={`${isUpdateLogOpenClass}`}>
        <UpdateLog
          board={board}
          selectedTask={selectedTask}
          setIsUpdateLogExpanded={setIsUpdateLogExpanded}
          isUpdateLogExpanded={isUpdateLogExpanded} />
      </div>
      <div ref={headerRef}>
        <BoardHeader
          isHeaderExpanded={isHeaderExpanded}
          setIsHeaderExpanded={setIsHeaderExpanded}
        />
      </div>
      <div className="group-container">
        {board.groups.map(group => {
          return (
            <article key={group.id} className="board-group">
              <div className='group-header'>
                <button className="board-menu-btn" onClick={() => onRemoveGroup(group.id)}><WorkSpaceOption /></button>
                <button className="collapse-btn" style={{color: group.style.color}}><ArrowDown /></button>
                <h2 style={{ color: group.style.color }} onClick={() => onEditGroupTitle(group.id)} className="group-title">{group.title}
                </h2>
                <h2 className='tasks-left'>{`${group.tasks.length} Tasks`}</h2>
              </div>
              {/* {editedGroupTitle.current !== group.id && <h2 onClick={()=>{editedGroupTitle.current = group.id; setIsEditMode(true)}} className="group-title">{group.title}</h2>}
          {isEditMode && editedGroupTitle.current === group.id && <h2><EditableText
                name="Edit-group"
                func={onEditGroup}
                value={group.title}
            /></h2>} */}
              <div className="group-content">
                <TaskList
                  setSelectedTask={setSelectedTask}
                  isUpdateLogExpanded={isUpdateLogExpanded}
                  setIsUpdateLogExpanded={setIsUpdateLogExpanded}
                  board={board}
                  group={group}
                  setBoard={setBoard} />
              </div>
            </article>
          )
        })}
      </div>
      <button onClick={onAddGroup}>Add new group</button>
    </section>
  )
}