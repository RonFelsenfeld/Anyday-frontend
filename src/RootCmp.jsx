import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { boardService } from '../src/services/board.service'

import { AppHeader } from './cmps/AppHeader'
import { SideBar } from './cmps/Sidebar'

// import { store } from './store/store'

export function App() {
  return (
    // <Provider store={store}>
    <Router>
      <section className="app">
        <AppHeader />
        <SideBar/>
        <main></main>
      </section>
      {/* <UserMsg /> */}
    </Router>
    // </Provider>
  )
}
