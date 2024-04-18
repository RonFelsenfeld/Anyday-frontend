import { SHOW_MODAL, SHOW_TOOLTIP } from '../reducers/system.reducer'
import { store } from '../store'

export function showToolTip(currentTarget, txt) {
  const { left, top, width, height } = currentTarget.getBoundingClientRect()
  const pos = { x: left, y: top }
  const targetDimensions = { width, height }

  store.dispatch({ type: SHOW_TOOLTIP, tooltip: { isOpen: true, pos, txt, targetDimensions } })
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
  // For the useScroll to not activate in each scroll
  const modal = store.getState().systemModule.modal
  if (!modal.isOpen) return

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
