import 'animate.css'
import { useSelector } from 'react-redux'

export function DynamicToolTip() {
  const tooltip = useSelector(storeState => storeState.systemModule.tooltip)
  const { pos, txt, targetDimensions } = tooltip
  let { isOpen } = tooltip

  // In mobile view --> disable tooltip
  if (window.innerWidth < 600) isOpen = false

  if (isOpen) {
    pos.x += targetDimensions.width / 2
  }

  return (
    <span
      className={`dynamic-tooltip animate__animated animate__fadeIn`}
      style={{ left: pos?.x, top: pos?.y, display: `${isOpen ? 'block' : 'none'}` }}
    >
      {txt}
    </span>
  )
}
