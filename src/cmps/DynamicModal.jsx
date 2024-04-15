import 'animate.css'
import { useLayoutEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT } from '../store/reducers/system.reducer'
import { useClickOutside } from '../customHooks/useClickOutside'

import { DynamicModalContent } from './DynamicModalContent'

export function DynamicModal() {
  const modal = useSelector(storeState => storeState.systemModule.modal)
  const [modalInfo, setModalInfo] = useState({ top: 0, left: 0, class: '' })
  const modalRef = useRef()

  const { isOpen, alignment = BOTTOM_CENTER, pos, cmp, targetDimensions, hasCaret = false } = modal

  useClickOutside(modalRef)

  // Hook that fires before the browser rerender the screen
  useLayoutEffect(() => {
    if (isOpen && pos && targetDimensions) {
      const { width: modalWidth, height: modalHeight } = modalRef.current.getBoundingClientRect()

      let modalTop = pos.y
      let modalLeft = pos.x

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let isOverflowingWidth = false
      let isOverflowingHeight = false

      // Checking if the modal's overflowing the screen width
      if (modalLeft + modalWidth > viewportWidth) {
        isOverflowingWidth = true

        modalTop += targetDimensions.height
        modalLeft = viewportWidth - modalWidth

        setModalInfo({ x: modalLeft, y: modalTop, class: 'overflow-width' })
      }

      // Checking if the modal's overflowing the screen height
      if (modalTop + modalHeight > viewportHeight) {
        isOverflowingHeight = true

        modalTop = pos.y - modalHeight - targetDimensions.height
        if (!isOverflowingWidth) modalLeft -= (modalWidth - targetDimensions.width) / 2

        const classList = isOverflowingWidth
          ? 'overflowing-width overflowing-height'
          : 'overflowing-height'

        return setModalInfo({ x: modalLeft, y: modalTop, class: classList })
      }

      if (isOverflowingWidth || isOverflowingHeight) return

      switch (alignment) {
        case BOTTOM_LEFT:
          modalTop += targetDimensions.height
          return setModalInfo({ x: modalLeft, y: modalTop })

        case BOTTOM_CENTER:
          modalTop += targetDimensions.height
          modalLeft += targetDimensions.width / 2
          return setModalInfo({ x: modalLeft, y: modalTop, class: 'centered' })

        case BOTTOM_RIGHT:
          modalTop += targetDimensions.height
          modalLeft += targetDimensions.width
          return setModalInfo({ x: modalLeft, y: modalTop })

        default:
          return setModalInfo({ x: modalLeft, y: modalTop })
      }
    }
  }, [isOpen])

  return (
    <dialog
      ref={modalRef}
      className={`dynamic-modal animate__animated animate__fadeIn ${hasCaret ? 'caret' : ''} 
      ${modalInfo?.class}`}
      style={{
        left: modalInfo?.x,
        top: modalInfo?.y,
        display: `${isOpen ? 'block' : 'none'}`,
      }}
    >
      <DynamicModalContent {...cmp} />
    </dialog>
  )
}
