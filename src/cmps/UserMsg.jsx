import { useEffect, useRef, useState } from 'react'
import { eventBus } from '../services/event-bus.service'
import { CheckUserMsg, CloseUserMsgBtn } from '../services/svg.service'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', msg => {
      setIsOpen(true)
      setMsg(msg)

      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
    return unsubscribe
  }, [])

  function closeMsg() {
    setIsOpen(false)
    setTimeout(() => setMsg(null), 1000)
  }

  const dynClass = isOpen
    ? 'animate__animated animate__bounceInDown'
    : 'animate__animated animate__bounceOutUp'
  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type} flex closed ${dynClass} `}>
      <CheckUserMsg />
      <div className="txt-container flex">{msg.txt}</div>
      <button onClick={closeMsg}>
        <CloseUserMsgBtn />
      </button>
    </section>
  )
}
