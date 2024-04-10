import { boardService } from "../../services/board.service"

export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const EDIT_BOARD = 'EDIT_BOARD'

export const SET_BOARD_FILTER_BY = 'SET_BOARD_FILTER_BY'
export const SET_GROUP_TASK_FILTER_BY = 'SET_GROUP_TASK_FILTER_BY'


const initialState = {
  boards: [],
  currentBoard: null,
  boardFilterBy: boardService.getDefaultBoardFilter(),
  groupTaskFilterBy: boardService.getDefaultGroupTaskFilter()
}

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boards: action.boards,
      }

    case SET_BOARD:
      return {
        ...state,
        currentBoard: action.board,
      }

    case REMOVE_BOARD:
      return {
        ...state,
        boards: state.boards.filter(board => board._id !== action.boardId),
      }

    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.board],
      }

    case EDIT_BOARD:
      return {
        ...state,
        boards: state.boards.map(board => (board._id === action.board._id ? action.board : board)),
        currentBoard: { ...action.board },
      }
    case SET_BOARD_FILTER_BY:
      return {
        ...state,
        boardFilterBy: { ...state.boardFilterBy, ...action.boardFilterBy }
      }
    case SET_GROUP_TASK_FILTER_BY:
      return {
        ...state,
        groupTaskFilterBy: { ...state.groupTaskFilterBy, ...action.groupTaskFilterBy }
      }

    default:
      return state
  }
}
