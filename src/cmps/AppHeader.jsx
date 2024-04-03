import { Help, Inbox, MenuGrid, NotificationBell, UserImg } from '../services/svg.service'

export function AppHeader() {
  return (
    <header className="app-header flex align-center justify-between">
      <div className="flex align-center">
        <button className="btn">
          <MenuGrid />
        </button>
        <h1 className="logo">Logo</h1>
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
