export const SHOW_MSG = 'show-msg'
export const SHOW_TOOLTIP = 'show-tooltip'

function createEventEmitter() {
  const listenersMap = {}
  return {
    on(evName, listener) {
      listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener]
      return () => {
        listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
      }
    },
    emit(evName, data) {
      if (!listenersMap[evName]) return
      listenersMap[evName].forEach(listener => listener(data))
    },
  }
}

export const eventBus = createEventEmitter()

export function showToolTip(txt = 'TOOLTIP', pos, width) {
  pos.x = pos.x + width / 2 // For the tool tip to be centered
  eventBus.emit(SHOW_TOOLTIP, { txt, pos })
}

export function hideToolTip() {
  eventBus.emit(SHOW_TOOLTIP, { txt: null, pos: null })
}

export function showUserMsg(msg) {
  eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt) {
  showUserMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
  showUserMsg({ txt, type: 'error' })
}

window.showUserMsg = showUserMsg
