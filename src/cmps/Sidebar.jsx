import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Home, MiniHome, MyWork, SidebarArrow, WorkSpaceOption } from '../services/svg.service'
import { boardService } from '../services/board.service'
import { loadBoards, removeBoard, saveBoard } from '../store/actions/board.actions'
import { showModal } from '../store/actions/system.actions'
import { BOTTOM_LEFT } from '../store/reducers/system.reducer'

import { SidebarSearch } from './SidebarSearch'
import { SidebarBoardList } from './SidebarBoardList'
import { showSuccessMsg } from '../services/event-bus.service'

export function Sidebar() {
  const boards = useSelector(storeState => storeState.boardModule.boards)

  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [boardToEdit, setBoardToEdit] = useState(null)

  const sidebarWidthRef = useRef(265)
  const navigate = useNavigate()

  useEffect(() => {
    loadBoards()
  }, [])

  async function onAddBoard() {
    try {
      const board = boardService.getEmptyBoard()
      const savedBoard = await saveBoard(board)
      navigate(`/board/${savedBoard._id}`)
    } catch (err) {
      console.log('Could not add a board', err)
    }
  }

  async function onDeleteBoard(boardId) {
    console.log(boardId)
    try {
      await removeBoard(boardId)
      showSuccessMsg('We successfully deleted the board')
    } catch (err) {
      console.log('Could not remove,', err)
    } finally {
      navigate('/board')
    }
  }

  async function onEditBoardTitle(newTitle) {
    boardToEdit.title = newTitle || boardToEdit.title
    try {
      await saveBoard(boardToEdit)
      setBoardToEdit(null)
    } catch (err) {
      console.log('Could not update board name', err)
    }
  }

  function onOpenSidebarMenu(title) {}

  function calcSidebarWidth() {
    return isExpanded ? sidebarWidthRef.current : 30
  }

  function handleHover({ target }) {
    if (target.type === 'button') return
    if (isExpanded) return

    setIsHovered(true)
    setIsExpanded(true)
  }

  function handleLeave() {
    if (!isHovered) return
    setIsHovered(false)
    setIsExpanded(false)
  }

  function toggleIsExpanded() {
    if (isHovered) {
      setIsHovered(false)
      setIsExpanded(true)
      return
    }
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
  }

  const dynArrowClass = !isExpanded ? 'collapsed' : ''
  const isOpenClass = !isExpanded || isHovered ? 'closed' : ''
  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className={`side-bar-container ${isOpenClass}`}
      style={{ width: calcSidebarWidth() + 'px' }}
    >
      <button
        type="button"
        className={`sidebar-btn-expand btn ${dynArrowClass}`}
        onClick={toggleIsExpanded}
      >
        <SidebarArrow />
      </button>
      {isExpanded && (
        <div>
          <div className="home-my-work-container flex column">
            <NavLink className="navlink" to={'/'}>
              <div className="home flex align-center">
                <div className="home-svg svg">
                  <Home />
                </div>
                <h4 className="home-h4">Home</h4>
              </div>
            </NavLink>

            <NavLink className="navlink" to={'/board'}>
              <div className="my-work flex align-center">
                <div className="my-work-svg svg">
                  <MyWork />
                </div>
                <h4 className="my-work-h4">My work</h4>
              </div>
            </NavLink>
          </div>

          <section className="side-bar-workspace">
            <div className="side-bar-workspace-nav flex align-center justify-between ">
              <div className="workspace-display flex justify-between">
                <div className="workspace-logo flex justify-center align-center">
                  M
                  <div className="mini-home-icon">
                    <MiniHome />
                  </div>
                </div>

                <span className="main-workspace-header">Main workspace</span>
              </div>

              <button className="main-workspace-option-menu">
                <WorkSpaceOption />
              </button>
            </div>

            <SidebarSearch onAddBoard={onAddBoard} />
          </section>

          {!!boards.length && (
            <SidebarBoardList
              boardToEdit={boardToEdit}
              setBoardToEdit={setBoardToEdit}
              onDeleteBoard={onDeleteBoard}
              onEditBoardTitle={onEditBoardTitle}
              boards={boards}
            />
          )}
        </div>
      )}
    </div>
  )
}
