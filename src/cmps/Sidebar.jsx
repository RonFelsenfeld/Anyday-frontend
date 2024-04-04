import { NavLink } from 'react-router-dom'
import { Home, MiniHome, MyWork, SidebarArrow, WorkSpaceOption } from '../services/svg.service'
import { SidebarSearch } from './SidebarSearch'
import React, { useEffect, useRef, useState } from 'react'

export function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const sidebarWidthRef = useRef(265)

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
            <NavLink className="navlink" to={'/workspace/board'}>
              <div className="home flex align-center">
                <div className="home-svg svg">
                  <Home />
                </div>
                <h4 className="home-h4">Home</h4>
              </div>
            </NavLink>
            <NavLink className="navlink" to={'/'}>
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
            <SidebarSearch />
          </section>
        </div>
      )}
    </div>
  )
}
