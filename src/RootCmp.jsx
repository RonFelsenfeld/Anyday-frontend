import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { WorkspaceIndex } from './pages/WorkspaceIndex'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'

import { store } from './store/store'
import { UpdateLog } from './cmps/UpdateLog'
import { DynamicToolTip } from './cmps/DynamicToolTip'
import { DynamicModal } from './cmps/DynamicModal'
import { UserMsg } from './cmps/UserMsg'
import { DeletedPage } from './pages/DeletedPage'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />

              <Route element={<WorkspaceIndex />} path="/board">
                <Route element={<BoardIndex />} path="/board" />
                  <Route element={<DeletedPage />} path="/board/delete/:boardId" />
                <Route element={<BoardDetails />} path="/board/:boardId">
                  <Route path="/board/:boardId/task/:taskId" element={<UpdateLog />} />
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
