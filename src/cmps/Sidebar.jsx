import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import {
  Home,
  MiniBoard,
  MiniHome,
  MyWork,
  SidebarArrow,
  WorkSpaceOption,
} from '../services/svg.service'

import { SidebarSearch } from './SidebarSearch'
import { boardService } from '../services/board.service'
import { useSelector } from 'react-redux'
import { loadBoards, removeBoard, saveBoard } from '../store/actions/board.actions'

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  //   const [boards, setBoards] = useState([])
  const boards = useSelector(storeState => storeState.boardModule.boards)
  const sidebarWidthRef = useRef(265)
  const optionsModal = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    loadBoards()
  }, [])

  async function addBoard(board) {
    try {
      const savedBoard = await saveBoard(board)
      navigate(`/board/${savedBoard._id}`)
    } catch (err) {
      console.log('could not add a board', err)
    }
  }

  //todo change to modal!!! button on line - 140
  async function deleteBoard(boardId) {
    try {
      await removeBoard(boardId)
    } catch (err) {
      console.log('could not remove,', err)
    } finally {
      navigate('/board')
    }
  }

  //Todo change this to  dynamic input modal
  async function editBoardName(boardId) {
    const boardToEdit = await boardService.getById(boardId)
    console.log(boardToEdit)
    boardToEdit.title = prompt('new title?') || 'New Title'
    try {
      await saveBoard(boardToEdit)
      //todo add navigate
      navigate(`/board/${boardToEdit._id}`)
    } catch (err) {
      console.log('could not update board name', err)
    }
  }

  function calcSidebarWidth() {
    return isExpanded ? sidebarWidthRef.current : 30
  }

  function toggleIsExpanded() {
    if (isHovered) {
      setIsHovered(false)
      setIsExpanded(true)
      return
    }
    setIsExpanded(prevIsExpanded => !prevIsExpanded)
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

  function onBoardOptionsClick() {}

  function onOpenOptionsModal() {}

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
            <SidebarSearch addBoard={addBoard} />
          </section>
          {!!boards.length && (
            <ul className="side-bar-boards-list clean-list">
              {boards.map(board => (
                <NavLink className="navlink" to={`/board/${board._id}`} key={board._id}>
                  <li className="board-li flex align-center">
                    <MiniBoard />
                    <div key={board._id} className="board-title-options flex align-center">
                      <span className="board-title-span">{board.title}</span>
                      <button
                        onClick={() => deleteBoard(board._id)}
                        className="remove-board-btn btn"
                      >
                        x
                      </button>
                      {/* <button onClick={onBoardOptionsClick} className="board-options-btn btn">
                                            </button> */}
                      <button
                        className="justify-center align-center"
                        onClick={() => editBoardName(board._id)}
                      >
                        <WorkSpaceOption />
                      </button>
                    </div>
                  </li>
                </NavLink>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
