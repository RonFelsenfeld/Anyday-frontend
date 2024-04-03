import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { boardService } from '../src/services/board.service'

// import { store } from './store/store'

export function App() {
  return (
    // <Provider store={store}>
    <Router>
      <section className="app">
        <main></main>
      </section>
      {/* <UserMsg /> */}
    </Router>
    // </Provider>
  )
}
