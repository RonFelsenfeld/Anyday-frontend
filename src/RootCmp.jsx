import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { HomePage } from './pages/HomePage'
import { WorkspaceIndex } from './pages/WorkspaceIndex'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'

import { store } from './store/store'
import { UpdateLog } from './cmps/UpdateLog'
import { Loader } from './cmps/Loader'

export function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <section className="app">
            <main>
              <Routes>
                <Route element={<HomePage />} path="/" />

                <Route element={<WorkspaceIndex />} path="/board">
                  <Route element={<BoardIndex />} path="/board" />
                  <Route element={<BoardDetails />} path="/board/:boardId" >
                  <Route path="/board/:boardId/task/:taskId" element={<UpdateLog />} />
                </Route>
                </Route>
              </Routes>
            </main>
          </section>
          {/* <UserMsg /> */}
        </Router>
      </DndProvider>
    </Provider>
  )
}
