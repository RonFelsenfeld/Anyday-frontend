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
import { loadBoards } from '../store/actions/board.actions'

export function SideBar() {
    const [isExpanded, setIsExpanded] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    //   const [boards, setBoards] = useState([])
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const sidebarWidthRef = useRef(265)
    const navigate = useNavigate()

    useEffect(() => {
        if (!boards.length) loadBoards()
    }, [])

    // async function loadBoards() {
    //     try {
    //         const boards = await boardService.query()
    //         setBoards(boards)
    //     } catch (err) {
    //         console.log('could not get boards', err)
    //     }
    // }

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

    async function addBoard(board) {
        try {
            const savedBoard = await boardService.save(board)
            setBoards(prevBoard => [...prevBoard, savedBoard])
            navigate(`/board/${savedBoard._id}`)
        } catch (err) {
            console.log('could not add a board', err)
        }
    }

    function onBoardOptionsClick() { }

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
                    {boards.length && (
                        <ul className="side-bar-boards-list clean-list">
                            {boards.map(board => (
                                <NavLink className="navlink" to={`/board/${board._id}`} key={board._id}>
                                    <li className="board-li flex align-center">
                                        <MiniBoard />
                                        <div key={board._id} className="board-title-options flex align-center">
                                            <span className="board-title-span">{board.title}</span>
                                            <button onClick={onBoardOptionsClick} className="board-options-btn btn">
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
