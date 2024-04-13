import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'

import { BoardList } from '../cmps/BoardList'
import { loadBoards } from '../store/actions/board.actions'
import { Loader } from '../cmps/Loader'

export function BoardIndex() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
  const boards = useSelector(storeState => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [boards.length])

  let userGreeting = utilService.greetBasedOnHour() + ', '
  userGreeting += user ? `${user.fullName}!` : 'guest!'

  if (isLoading) return <Loader />
  return (
    <section className="board-index">
      <header className="index-header flex align-center">
        <div className="greetings">
          <p className="user-greet">{userGreeting}</p>
          <h3 className="title">Quickly access your recent boards, Inbox and workspaces</h3>
        </div>

        <img
          src="/assets/img/workspace-header-preview.svg"
          alt="Confetti"
          className="header-background-img"
        />
      </header>

      <BoardList boards={boards} />
    </section>
  )
}
