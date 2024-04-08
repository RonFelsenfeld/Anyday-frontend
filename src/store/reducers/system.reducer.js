export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_TOOLTIP = 'SET_TOOLTIP'

const initialState = {
  isLoading: true,
  tooltip: { isOpen: false, pos: null, txt: '', targetWidth: null },
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    case SET_TOOLTIP:
      return {
        ...state,
        tooltip: { ...action.tooltip },
      }

    default:
      return state
  }
}
