import { Outlet } from 'react-router'

import { AppHeader } from '../cmps/AppHeader'
import { SideBar } from '../cmps/Sidebar'

export function WorkspaceIndex() {
  return (
    <section className="workspace-index main-layout">
      <AppHeader />
      <SideBar />
      <Outlet />
    </section>
  )
}
