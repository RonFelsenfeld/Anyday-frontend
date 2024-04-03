import { Help, Inbox, MenuGrid, NotificationBell } from '../services/svg.service'

export function AppHeader() {
  return (
    <section className="app-header flex align-center justify-between">
      <div className="flex align-center">
        <button className="btn">
          <MenuGrid />
        </button>
        <h1>Logo</h1>
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
      </div>
    </section>
  )
}
