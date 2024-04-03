import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { WorkspaceIndex } from './pages/WorkspaceIndex'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'

// import { store } from './store/store'

export function App() {
  return (
    // <Provider store={store}>
    <Router>
      <section className="app">
        <main>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<BoardIndex />} path="/board">
              <Route element={<BoardDetails />} path="/board/:boardId" />
            </Route>
          </Routes>
        </main>
      </section>
      {/* <UserMsg /> */}
    </Router>
    // </Provider>
  )
}
