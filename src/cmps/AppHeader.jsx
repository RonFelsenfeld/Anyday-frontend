import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Help,
  Inbox,
  MenuGrid,
  NotificationBell,
  UserImg,
  WorkspaceLogo,
} from '../services/svg.service'
import { BOTTOM_RIGHT } from '../store/reducers/system.reducer'
import { showModal } from '../store/actions/system.actions'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const navigate = useNavigate()

  function handleAuthClick({ currentTarget }) {
    const cmpInfo = {
      type: 'optionsMenu',
      options: [
        {
          title: `${user ? 'Logout' : 'Login'}`,
          icon: `${user ? 'logout' : 'login'}`,
          func: user ? logout : navigateToLoginPage,
        },
      ],
    }

    function navigateToLoginPage() {
      navigate(`/auth`)
    }

    showModal(currentTarget, BOTTOM_RIGHT, cmpInfo, false)
  }

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

      <div className="actions-container flex align-center">
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
          <button className="btn" onClick={handleAuthClick}>
            <UserImg />
          </button>
        )}

        {user && (
          <div className="user-img-container flex align-center justify-center">
            <img
              src={`${user.imgUrl ? user.imgUrl : '/assets/img/user-avatar.svg'}`}
              alt="User profile picture"
              className="user-img"
              onClick={handleAuthClick}
            />
          </div>
        )}
      </div>
    </header>
  )
}
