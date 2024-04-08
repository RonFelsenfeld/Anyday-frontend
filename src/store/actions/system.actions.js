import { SHOW_MODAL, SHOW_TOOLTIP } from '../reducers/system.reducer'
import { store } from '../store'

export function showToolTip(target, txt) {
  const { left, top, width: targetWidth } = target.getBoundingClientRect()
  const pos = { x: left, y: top }
  store.dispatch({ type: SHOW_TOOLTIP, tooltip: { isOpen: true, pos, txt, targetWidth } })
}

export function hideToolTip() {
  store.dispatch({
    type: SHOW_TOOLTIP,
    tooltip: { isOpen: false, pos: null, txt: '', targetWidth: null },
  })
}

export function showModal(target, txt) {
  const { left, top, width: targetWidth } = target.getBoundingClientRect()
  const pos = { x: left, y: top }
  store.dispatch({ type: SHOW_MODAL, modal: { isOpen: true, pos, txt, targetWidth } })
}
