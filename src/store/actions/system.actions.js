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

export function showModal(currentTarget, alignment, cmp, hasCaret) {
  const { left, top, width, height } = currentTarget.getBoundingClientRect()
  const pos = { x: left, y: top }
  const targetDimensions = { width, height }

  store.dispatch({
    type: SHOW_MODAL,
    modal: { isOpen: true, pos, alignment, cmp, targetDimensions, hasCaret },
  })
}

export function hideModal() {
  store.dispatch({
    type: SHOW_MODAL,
    modal: {
      isOpen: false,
      pos: null,
      alignment: null,
      txt: '',
      targetDimensions: null,
      hasCaret: false,
    },
  })
}
