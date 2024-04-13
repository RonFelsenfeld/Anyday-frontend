import { useState } from 'react'
import { TaskSort } from './TaskSort'

export function TaskSortModal() {
  const [isSorting, setIsSorting] = useState(false)

  return (
    <section className="task-sort-modal">
      {!isSorting && (
        <>
          <h3 className="sort-title">Sort this board by column</h3>
          <p className="sort-description">
            Sort items by status, priority, or any other column on this board.
          </p>
          <button onClick={() => setIsSorting(true)} className="btn-add-sort">
            + new sort
          </button>
        </>
      )}

      {isSorting && <TaskSort />}
    </section>
  )
}
