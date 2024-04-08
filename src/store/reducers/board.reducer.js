export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const EDIT_BOARD = 'EDIT_BOARD'

const initialState = {
  boards: [],
  currentBoard: null,
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

    default:
      return state
  }
}
