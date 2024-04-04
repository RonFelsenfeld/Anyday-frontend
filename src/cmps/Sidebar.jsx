import { Link } from 'react-router-dom'
import { Home, MiniHome, MyWork, WorkSpaceOption } from '../services/svg.service'

export function SideBar() {
  return (
    <div className="side-bar-container">
      <div className="home-my-work-container flex column">
        <div className="home flex align-center">
          {/* <Link to={'/'}> */}
          <div className="home-svg svg">
            <Home />
          </div>
          {/* </Link> */}
          {/* <Link to={'/'}> */}
          <h4 className="home-h4">Home</h4>
          {/* </Link> */}
        </div>
        <div className="my-work flex align-center">
          {/* <Link to={'/'}> */}
          <div className="my-work-svg svg">
            <MyWork />
          </div>
          {/* </Link> */}
          {/* <Link to={'/'}> */}
          <h4 className="my-work-h4">My Work</h4>
          {/* </Link> */}
        </div>
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
      </section>
    </div>
  )
}
