export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SHOW_TOOLTIP = 'SHOW_TOOLTIP'
export const SHOW_MODAL = 'SHOW_MODAL'

// Modal alignment constants
export const BOTTOM_LEFT = 'BOTTOM_LEFT'
export const BOTTOM_CENTER = 'BOTTOM_CENTER'
export const BOTTOM_RIGHT = 'BOTTOM_RIGHT'

const initialState = {
  isLoading: true,
  tooltip: { isOpen: false, pos: null, txt: '', targetWidth: null },
  modal: {
    isOpen: false,
    pos: null,
    alignment: null,
    cmp: '', // ! Change to options
    targetDimensions: null,
    hasCaret: false,
  },
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    case SHOW_TOOLTIP:
      return {
        ...state,
        tooltip: { ...action.tooltip },
      }

    case SHOW_MODAL:
      return {
        ...state,
        modal: { ...action.modal },
      }

    default:
      return state
  }
}
