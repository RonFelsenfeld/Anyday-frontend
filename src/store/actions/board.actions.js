import { boardService } from '../../services/board.service'
import {
  SOCKET_EMIT_SET_BOARD,
  SOCKET_EMIT_UPDATE_BOARD,
  socketService,
} from '../../services/socket-service'
import {
  ADD_BOARD,
  EDIT_BOARD,
  REMOVE_BOARD,
  SET_BOARD,
  SET_BOARDS,
  SET_BOARD_FILTER_BY,
  SET_FILTERED_BOARD,
  SET_GROUP_TASK_FILTER_BY,
  SET_SORT_BY,
  // SET_MARKED_TEXT,
} from '../reducers/board.reducer'
import { SET_IS_LOADING } from '../reducers/system.reducer'
import { store } from '../store'

export async function loadBoards() {
  const boardFilterBy = store.getState().boardModule.boardFilterBy

  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const boards = await boardService.query(boardFilterBy)

    store.dispatch({ type: SET_BOARDS, boards })
  } catch (err) {
    console.log('board action -> cannot load boards', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function loadBoard(boardId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const board = await boardService.getById(boardId)
    document.title = `(${boardService.getTotalTasksByBoard(board)}) ${board.title}`

    store.dispatch({ type: SET_BOARD, board })
    socketService.emit(SOCKET_EMIT_SET_BOARD, board)

    const boardDeepCopy = structuredClone(board)
    store.dispatch({ type: SET_FILTERED_BOARD, board: boardDeepCopy })
  } catch (err) {
    console.log('board action -> cannot load board', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function removeBoard(boardId) {
  try {
    await boardService.remove(boardId)
    store.dispatch({ type: REMOVE_BOARD, boardId })
  } catch (err) {
    console.log('board action -> cannot remove board', err)
    throw err
  }
}

export async function saveBoard(board) {
  const type = board._id ? EDIT_BOARD : ADD_BOARD
  try {
    const savedBoard = await boardService.save(board)
    store.dispatch({ type, board: savedBoard })
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)

    return savedBoard
  } catch (err) {
    console.log('board action -> cannot save board', err)
    throw err
  }
}

/// GROUPS ///

export async function removeGroup(board, groupId) {
  try {
    const savedBoard = await boardService.removeGroup(board, groupId)

    store.dispatch({ type: EDIT_BOARD, board: savedBoard })
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)
    onFilterSortBoard(savedBoard)

    return savedBoard
  } catch (err) {
    console.log('group action -> cannot remove group', err)
    throw err
  }
}

export async function saveGroup(board, group) {
  try {
    const savedBoard = await boardService.saveGroup(board, group)

    store.dispatch({ type: EDIT_BOARD, board: savedBoard })
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)
    onFilterSortBoard(savedBoard)

    return savedBoard
  } catch (err) {
    console.log('group action -> cannot save group', err)
    throw err
  }
}

/// TASKS ///

export async function removeTask(board, group, taskId) {
  try {
    const savedBoard = await boardService.removeTask(board, group, taskId)

    store.dispatch({ type: EDIT_BOARD, board: savedBoard })
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)
    onFilterSortBoard(savedBoard)

    return savedBoard
  } catch (err) {
    console.log('task action -> cannot remove task', err)
    throw err
  }
}

export async function saveTask(board, group, task, unshift) {
  try {
    const savedBoard = await boardService.saveTask(board, group, task, unshift)

    store.dispatch({ type: EDIT_BOARD, board: savedBoard })
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard)
    onFilterSortBoard(savedBoard)

    return savedBoard
  } catch (err) {
    console.log('task action -> cannot save task', err)
    throw err
  }
}

// Filter & Sort

export function setBoardFilterBy(boardFilterBy) {
  store.dispatch({ type: SET_BOARD_FILTER_BY, boardFilterBy })
}

export function setGroupTaskFilterBy(groupTaskFilterBy) {
  store.dispatch({ type: SET_GROUP_TASK_FILTER_BY, groupTaskFilterBy })
}

export async function setSortBy(sortBy) {
  store.dispatch({ type: SET_SORT_BY, sortBy })
}

export async function onFilterSortBoard(board = null, filterBy = null, sortBy = null) {
  if (!board) {
    board = store.getState().boardModule.currentBoard
  }

  if (!board) return

  if (!filterBy) {
    filterBy = store.getState().boardModule.groupTaskFilterBy
  }

  if (!sortBy) {
    sortBy = store.getState().boardModule.boardSortBy
  }

  const boardDeepCopy = structuredClone(board)
  try {
    const filteredGroups = boardService.filterBoard(boardDeepCopy, filterBy)
    const newFilteredBoard = { ...boardDeepCopy, groups: [...filteredGroups] }

    let sortedGroups = null

    if (sortBy) {
      sortedGroups = boardService.sortBoard(newFilteredBoard, sortBy)
    }

    store.dispatch({
      type: SET_FILTERED_BOARD,
      board: { ...boardDeepCopy, groups: sortedGroups || filteredGroups },
    })
  } catch (err) {
    console.log(err)
  }
}

// export function markFilteredTxt(markedTxt) {
//   store.dispatch({ type: SET_MARKED_TEXT, markedTxt })
// }
