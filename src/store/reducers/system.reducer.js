export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SHOW_TOOLTIP = 'SHOW_TOOLTIP'
export const SHOW_MODAL = 'SHOW_MODAL'

const initialState = {
  isLoading: true,
  tooltip: { isOpen: false, pos: null, txt: '', targetWidth: null },
  modal: {
    isOpen: false,
    pos: null,
    alignment: null,
    txt: '', // ! Change to options
    targetWidth: null,
    isHasCaret: false,
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
        modal: { ...action.modal }, // ? Spread the alignment
      }

    default:
      return state
  }
}
