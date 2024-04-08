import { SET_TOOLTIP } from '../reducers/system.reducer'
import { store } from '../store'

export function showToolTip(target, txt) {
  const { left, top, width: targetWidth } = target.getBoundingClientRect()
  const pos = { x: left, y: top }
  store.dispatch({ type: SET_TOOLTIP, tooltip: { isOpen: true, pos, txt, targetWidth } })
}

export function hideToolTip() {
  store.dispatch({
    type: SET_TOOLTIP,
    tooltip: { isOpen: false, pos: null, txt: '', targetWidth: null },
  })
}
