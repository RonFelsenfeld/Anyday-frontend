import { boardService } from "../../services/board.service";
import { ADD_BOARD, ADD_GROUP, ADD_TASK, EDIT_BOARD, EDIT_GROUP, EDIT_TASK, REMOVE_BOARD, REMOVE_GROUP, REMOVE_TASK, SET_BOARDS } from "../reducers/board.reducer";
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
        const board = await boardService.save(board)
        store.dispatch({ type, board })
    } catch (err) {
        console.log('board action -> cannot save board', err)
        throw err
    }
}

/// GROUPS ///

export async function removeGroup(board, groupId) {
    try {
        await boardService.removeGroup(board, groupId)
        store.dispatch({ type: REMOVE_GROUP, board, groupId })
    } catch (err) {
        console.log('group action -> cannot remove group', err)
        throw err
    }
}

export async function saveGroup(board, group) {
    const type = group.id ? EDIT_GROUP : ADD_GROUP
    try {
        const savedGroup = await boardService.saveGroup(board, group)
        store.dispatch({ type, board, group: savedGroup })
    } catch (err) {
        console.log('group action -> cannot save group', err)
        throw err
    }
}

/// TASKS ///

export async function removeTask(board, group, taskId) {
    try {
        await boardService.removeTask(board, group, taskId)
        store.dispatch({ type: REMOVE_TASK, board, group, taskId })
    } catch (err) {
        console.log('task action -> cannot remove task', err)
        throw err
    }
}

export async function saveTask(board, group, task) {
    const type = task.id ? EDIT_TASK : ADD_TASK
    try {
        const savedTask = await boardService.saveTask(board, group, task)
        store.dispatch({ type, board, task: savedTask })
    } catch (err) {
        console.log('task action -> cannot save task', err)
        throw err
    }
}