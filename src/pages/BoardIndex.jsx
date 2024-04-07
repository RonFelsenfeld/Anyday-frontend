import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { BoardList } from '../cmps/BoardList'
import { loadBoards } from '../store/actions/board.actions'
import { Loader } from '../cmps/Loader'

export function BoardIndex() {
  const isLoading = useSelector(storeState => storeState.boardModule.isLoading)
  const boards = useSelector(storeState => storeState.boardModule.boards)

  useEffect(() => {
    loadBoards()
  }, [boards.length])

  if (isLoading) return <Loader />

  return (
    <section className="board-index">
      <header className="index-header flex align-center">
        <div>
          <p className="user-greet">Hello user!</p>
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
