import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const supabaseURL = 'https://nmnbuhblvxcxadvmiywh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tbmJ1aGJsdnhjeGFkdm1peXdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNjg5ODUsImV4cCI6MjAyODg0NDk4NX0.P1J6wgL9UgxBm5tE2rgufbXUjyXA-pgYGWdDaAzq-Go'

const supabase = createClient(supabaseURL, supabaseKey)

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
import { useEffect, useRef } from 'react'

export function App() {
  const isLogMsgPrinted = useRef(false)
  useEffect(() => {

    printLogMsg()

  }, [])

  function printLogMsg() {


    if (isLogMsgPrinted.current) return
    console.log(
      `%cLooking for web developers?\n%cWe're looking for a job. Contact us!\n\n
%c Ido Yotvat: %chttps://www.linkedin.com/in/ido-yotvat-52940020b/\n
%c Atar Mor: %chttps://www.linkedin.com/in/atar-mor-535388103/\n
%c Ron Felsenfeld: %chttps://www.linkedin.com/in/ron-felsenfeld-73553a261/\n`,
      "color: #6161ff; font-size:20px;",
      "color: #FFCE04; font-size:14px;",
      "color: #F6335A; font-size:14px;",
      "color: #F6335A; font-size:14px;",
      "color: #FFCE04; font-size:14px;",
      "color: #FFCE04; font-size:14px;",
      "color: #04CC77; font-size:14px;",
      "color: #04CC77; font-size:14px;"
    );


    isLogMsgPrinted.current = true

  }

  return (
    <Provider store={store}>
      <SessionContextProvider supabaseClient={supabase}>
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
      </SessionContextProvider>
    </Provider>
  )
}
