import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { store } from './store/store'

import { HomePage } from './pages/HomePage'
import { WorkspaceIndex } from './pages/WorkspaceIndex'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import { DeletedPage } from './pages/DeletedPage'
import { LoginSignup } from './pages/LoginSignup'

import { UpdateLog } from './cmps/UpdateLog'
import { DynamicToolTip } from './cmps/DynamicToolTip'
import { DynamicModal } from './cmps/DynamicModal'
import { UserMsg } from './cmps/UserMsg'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<LoginSignup />} path="/auth" />

              <Route element={<WorkspaceIndex />} path="/board">
                <Route element={<BoardIndex />} path="/board" />
                <Route element={<DeletedPage />} path="/board/delete/:boardId" />
                <Route element={<BoardDetails />} path="/board/:boardId">
                  <Route element={<UpdateLog />} path="/board/:boardId/task/:taskId" />
                </Route>
              </Route>
            </Routes>
          </main>
          <DynamicToolTip />
          <DynamicModal />
        </section>
        <UserMsg />
      </Router>
    </Provider>
  )
}
