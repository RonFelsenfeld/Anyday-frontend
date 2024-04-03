import { MenuGrid, NotificationBell } from '../services/svg.service'

export function AppHeader() {
  return (
    <section className="app-header flex align-center">
      <MenuGrid />
      <NotificationBell />
    </section>
  )
}
