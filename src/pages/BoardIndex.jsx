import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { utilService } from '../services/util.service'
import { loadBoards, saveBoard } from '../store/actions/board.actions'
import { AddBoardBtn } from '../services/svg.service'
import { boardService } from '../services/board.service'

import { BoardList } from '../cmps/BoardList'
import { Loader } from '../cmps/Loader'
import { showSuccessMsg } from '../services/event-bus.service'

export function BoardIndex() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
  const boards = useSelector(storeState => storeState.boardModule.boards)
  const navigate = useNavigate()

  useEffect(() => {
    loadBoards()
  }, [boards.length])

  // For mobile view
  async function onAddBoard() {
    try {
      const board = boardService.getEmptyBoard()
      const savedBoard = await saveBoard(board)
      navigate(`/board/${savedBoard._id}`)
      showSuccessMsg('We successfully added the board')
    } catch (err) {
      console.log('Could not add a board', err)
    }
  }

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

      <button className="btn btn-new-board mobile-view" onClick={onAddBoard}>
        <AddBoardBtn />
      </button>
    </section>
  )
}
