import 'animate.css'
import { useSelector } from 'react-redux'

export function DynamicToolTip() {
  const tooltip = useSelector(storeState => storeState.systemModule.tooltip)
  const { isOpen, pos, txt, targetWidth } = tooltip

  if (targetWidth) pos.x = pos.x + targetWidth / 2 // For the tool tip to be centered

  if (!isOpen) return <span></span>
  return (
    <span
      className="dynamic-tooltip animate__animated animate__fadeIn"
      style={{ left: pos.x, top: pos.y }}
    >
      {txt}
    </span>
  )
}
