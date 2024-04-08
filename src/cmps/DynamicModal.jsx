import 'animate.css'
import { useSelector } from 'react-redux'

export function DynamicModal() {
  const modal = useSelector(storeState => storeState.systemModule.modal)
  const { isOpen, pos, alignment, txt, targetWidth } = modal
  const viewportWidth = window.innerWidth

  switch (alignment) {
    case 'bottom-center':
      if (targetWidth) pos.x = pos.x + targetWidth / 2
      break

    case 'bottom-left':
      break

    case 'bottom-right':
      break

    default:
      break
  }

  if (!isOpen) return <span></span>
  return (
    <dialog
      className="dynamic-modal animate__animated animate__fadeIn"
      style={{ left: pos.x, top: pos.y }}
    >
      {txt}
    </dialog>
  )
}
