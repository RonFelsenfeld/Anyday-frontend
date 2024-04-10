import { boardService } from '../../services/board.service'
import {
  ADD_BOARD,
  EDIT_BOARD,
  REMOVE_BOARD,
  SET_BOARD,
  SET_BOARDS,
  SET_BOARD_FILTER_BY,
  SET_GROUP_TASK_FILTER_BY,
} from '../reducers/board.reducer'
import { SET_IS_LOADING, } from '../reducers/system.reducer'
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
  const groupTaskFilterBy = store.getState().boardModule.groupTaskFilterBy
  // console.log(groupTaskFilterBy)

  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  try {
    const board = await boardService.getById(boardId, groupTaskFilterBy)
    store.dispatch({ type: SET_BOARD, board })
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
    return savedBoard
  } catch (err) {
    console.log('task action -> cannot remove task', err)
    throw err
  }
}

export async function saveTask(board, group, task) {
  console.log(task)
  try {
    const savedBoard = await boardService.saveTask(board, group, task)
    store.dispatch({ type: EDIT_BOARD, board: savedBoard })
    return savedBoard
  } catch (err) {
    console.log('task action -> cannot save task', err)
    throw err
  }
}

export function setBoardFilterBy(boardFilterBy) {
  store.dispatch({ type: SET_BOARD_FILTER_BY, boardFilterBy })
}
export function setGroupTaskFilterBy(groupTaskFilterBy) {
  // console.log(groupTaskFilterBy)
  store.dispatch({ type: SET_GROUP_TASK_FILTER_BY, groupTaskFilterBy })
}

export async function onFilterBoard(boardId, filterBy) {
  try {
    const board = await boardService.getById(boardId)
    const filteredGroups =  boardService.filterBoard(board, filterBy)
    store.dispatch({ type: SET_BOARD, board: { ...board, groups: filteredGroups } })


  } catch (err) {
    console.log(err)
  }
}