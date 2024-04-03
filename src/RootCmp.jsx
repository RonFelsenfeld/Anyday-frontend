import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { BoardIndex } from './pages/BoardIndex'
import { BoardDetails } from './pages/BoardDetails'
import { BoardHeader } from './cmps/BoardHeader'
import { SideBar } from './cmps/Sidebar'

// import { store } from './store/store'

export function App() {
  return (
    // <Provider store={store}>
    <Router>
      <section className="app">
        <AppHeader />
        <SideBar />
        <main>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<BoardIndex />} path="/board" />
            <Route element={<BoardDetails />} path="/board/:boardId" />
          </Routes>

          <BoardHeader />
          <BoardIndex />
        </main>
      </section>
      {/* <UserMsg /> */}
    </Router>
    // </Provider>
  )
}
