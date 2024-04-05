export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const EDIT_BOARD = 'EDIT_BOARD'

export const REMOVE_GROUP = 'REMOVE_GROUP'
export const ADD_GROUP = 'ADD_GROUP'
export const EDIT_GROUP = 'EDIT_GROUP'

export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const EDIT_TASK = 'EDIT_TASK'

const initialState = {
    boards: []
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }
        case REMOVE_BOARD:
            return {
                ...state, boards: state.boards.filter(board =>
                    board._id !== action.boardId)
            }
        case ADD_BOARD:
            return {
                ...state, boards: [...boards, action.board]
            }
        case EDIT_BOARD:
            return {
                ...state, boards: state.boards.map(board =>
                    board._id === action.board._id ? action.board : board)
            }


        case REMOVE_GROUP:
            return {
                ...state, boards: state.boards.map(board =>
                    board._id === action.board._id ?
                        board.groups.filter(group =>
                            group.id !== action.group.id) : board)
            }
        case ADD_GROUP:
            return {
                ...state, boards: state.boards.map(board => 
                    board._id === action.board._id ? 
                    {...board, groups: [...board.groups, action.group]} :
                     board)
            }
        case EDIT_GROUP:
            return {
                ...state, boards: state.boards.map(board =>
                    board._id === action.board._id ? 
                    {...board, groups: board.groups.map(group => 
                        group.id === action.group.id ? action.group : group)} : board)
            }


        // case REMOVE_TASK:
        //     return {
        //         ...state, boards: state.boards.map(board =>
        //             board._id === action.board._id ?
        //                 board.groups.filter(group =>
        //                     group.id !== action.groupId) : board)
        //     }
        // case ADD_TASK:
        //     return {
        //         ...state, boards: state.boards.map(board => 
        //             board._id === action.board._id ? 
        //             {...board, groups: [...board.groups, action.group]} :
        //              board)
        //     }
        // case EDIT_TASK:
        //     return {
        //         ...state, boards: state.boards.map(board =>
        //             board._id === action.board._id ? 
        //             {...board, groups: board.groups.map(group => 
        //                 group.id === action.group.id ? action.group : group)} : board)
        //     }

        default:
            return state
    }
}
