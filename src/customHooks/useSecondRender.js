import { useEffect, useRef } from 'react'

export function useSecondRender(callback) {
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1

    if (renderCount.current === 2) {
      callback()
    }
  }, [callback])
}
