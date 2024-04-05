import { boardService } from "../../services/board.service";
import { ADD_BOARD, EDIT_BOARD, REMOVE_BOARD, SET_BOARDS } from "../reducers/board.reducer";
import { store } from '../store';

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('board action -> cannot load boards', err)
        throw err
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
    try {
        const savedBoard = await boardService.saveTask(board, group, task)
        store.dispatch({ type: EDIT_BOARD, board: savedBoard })
        return savedBoard
    } catch (err) {
        console.log('task action -> cannot save task', err)
        throw err
    }
}