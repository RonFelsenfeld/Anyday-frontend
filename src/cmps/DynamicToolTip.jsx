import { useEffect, useState } from 'react'
import { eventBus } from '../services/event-bus.service'
import 'animate.css'

export function DynamicToolTip() {
  const [txt, setTxt] = useState(null)
  const [pos, setPos] = useState(null)

  useEffect(() => {
    const unsubscribe = eventBus.on('show-tooltip', ({ txt, pos }) => {
      setTxt(txt)
      setPos({ ...pos })
    })

    return unsubscribe
  }, [])

  if (!txt) return <span></span>
  return (
    <span
      className="dynamic-tooltip animate__animated animate__fadeIn"
      style={{ left: pos.x, top: pos.y }}
    >
      {txt}
    </span>
  )
}
