import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Help,
  Inbox,
  MenuGrid,
  NotificationBell,
  UserImg,
  WorkspaceLogo,
} from '../services/svg.service'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)

  return (
    <header className="app-header flex align-center justify-between">
      <div className="menu-logo-container">
        <button className="btn">
          <MenuGrid />
        </button>

        <div className="logo-container flex align-center">
          <button className="btn-logo">
            <WorkspaceLogo size={25} />
          </button>
          <span className="logo-main">monday</span>
          <span className="logo-secondary">work management</span>
        </div>
      </div>

      <div className="actions-container flex">
        <button className="btn">
          <NotificationBell />
        </button>

        <button className="btn">
          <Inbox />
        </button>

        <button className="btn">
          <Help />
        </button>

        {!user && (
          <Link to={'/auth'}>
            <button className="btn">
              <UserImg />
            </button>
          </Link>
        )}

        {user && (
          <Link to={'/auth'}>
            <button className="btn">
              <UserImg />
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}
