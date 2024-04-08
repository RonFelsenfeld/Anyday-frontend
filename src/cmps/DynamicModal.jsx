import 'animate.css'
import { useRef } from 'react'
import { useSelector } from 'react-redux'

import { useClickOutside } from '../customHooks/useClickOutside'
import { BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT } from '../store/reducers/system.reducer'
import { DynamicLabelPicker } from './DynamicLabelPicker'
import { PersonPicker } from './PersonPicker'

export function DynamicModal() {
  const modal = useSelector(storeState => storeState.systemModule.modal)
  const modalRef = useRef()
  const { isOpen, pos, alignment, cmp, targetDimensions, hasCaret } = modal
  let classList = ''
  // const viewportWidth = window.innerWidth

  useClickOutside(modalRef)

  function dynamicCmp() {
    switch (cmp.type) {
      case 'labelPicker':
        return <DynamicLabelPicker {...cmp} />
      case 'personPicker':
        return <PersonPicker {...cmp} />
    }
  }

  switch (alignment) {
    case BOTTOM_LEFT:
      pos.y += targetDimensions.height
      break

    case BOTTOM_CENTER:
      pos.y += targetDimensions.height
      pos.x = pos.x + targetDimensions.width / 2
      classList += 'centered '
      break

    case BOTTOM_RIGHT:
      pos.x += targetDimensions.width
      pos.y += targetDimensions.height
      break

    default:
      break
  }

  if (hasCaret) classList += ' caret'

  if (!isOpen) return <span></span>
  return (
    <dialog
      ref={modalRef}
      className={`dynamic-modal animate__animated animate__fadeIn ${classList}`}
      style={{ left: pos.x, top: pos.y }}
    >
      {dynamicCmp()}
    </dialog>
  )
}
