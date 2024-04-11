import { useEffect } from 'react'

export function useScroll(el, cb) {
  useEffect(() => {
    el.addEventListener('scroll', cb)

    return () => {
      el.removeEventListener('scroll', cb)
    }
  }, [cb])
}
