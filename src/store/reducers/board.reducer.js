export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const EDIT_BOARD = 'EDIT_BOARD'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
  boards: [],
  isLoading: true,
}

export function boardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boards: action.boards,
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
      }

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    default:
      return state
  }
}
