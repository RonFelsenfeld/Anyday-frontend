import { boardService } from '../../services/board.service'

export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const SET_FILTERED_BOARD = 'SET_FILTERED_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const EDIT_BOARD = 'EDIT_BOARD'

export const SET_BOARD_FILTER_BY = 'SET_BOARD_FILTER_BY'
export const SET_GROUP_TASK_FILTER_BY = 'SET_GROUP_TASK_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'

export const SET_ACTIVE_TASK_ID = 'SET_ACTIVE_TASK_ID'
export const SET_LABEL_IN_EDITING = 'SET_LABEL_IN_EDITING'

// export const SET_MARKED_TEXT = 'SET_MARKED_TEXT'

const initialState = {
  boards: [],
  currentBoard: null,
  filteredBoard: null,
  boardFilterBy: boardService.getDefaultBoardFilter(),
  groupTaskFilterBy: boardService.getDefaultGroupTaskFilter(),
  boardSortBy: boardService.getDefaultSortBy(),
  activeTaskId: null,
  labelInEditing: null
  // markedTxt: ''
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

    case SET_FILTERED_BOARD:
      return {
        ...state,
        filteredBoard: action.board,
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
        filteredBoard: { ...action.board },
      }

    case SET_BOARD_FILTER_BY:
      return {
        ...state,
        boardFilterBy: { ...state.boardFilterBy, ...action.boardFilterBy },
      }

    case SET_GROUP_TASK_FILTER_BY:
      return {
        ...state,
        groupTaskFilterBy: { ...state.groupTaskFilterBy, ...action.groupTaskFilterBy },
      }

    case SET_SORT_BY:
      return {
        ...state,
        boardSortBy: action.sortBy ? { ...action.sortBy } : null,
      }

    case SET_ACTIVE_TASK_ID:
      return {
        ...state,
        activeTaskId: action.taskId,
      }

    case SET_LABEL_IN_EDITING:
      return {
        ...state,
        labelInEditing: { taskId: action.taskId, labelType: action.labelType },
      }

    // case SET_MARKED_TEXT:
    //   return {
    //     ...state,
    //     markedTxt: action.markedTxt
    //   }
    default:
      return state
  }
}
