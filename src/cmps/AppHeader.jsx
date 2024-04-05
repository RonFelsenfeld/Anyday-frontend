import {
  Help,
  Inbox,
  MenuGrid,
  NotificationBell,
  UserImg,
  WorkspaceLogo,
} from '../services/svg.service'

export function AppHeader() {
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

        <button className="btn">
          <UserImg />
        </button>
      </div>
    </header>
  )
}
