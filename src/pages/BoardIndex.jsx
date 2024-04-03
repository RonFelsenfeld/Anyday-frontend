import { BoardList } from '../cmps/BoardList'

export function BoardIndex() {
  return (
    <section className="board-index">
      <header className="index-header flex align-center">
        <div>
          <p className="user-greet">Hello user!</p>
          <h3 className="title">Quickly access your recent boards, Inbox and workspaces</h3>
        </div>

        <img
          src="https://cdn.monday.com/images/homepage-desktop/header-background-v2.svg"
          alt="Confetti"
          className="header-background-img"
        />
      </header>

      <BoardList />
    </section>
  )
}
