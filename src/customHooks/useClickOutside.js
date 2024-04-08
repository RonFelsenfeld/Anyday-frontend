import { useEffect } from 'react'
import { hideModal } from '../store/actions/system.actions'

export function useClickOutside(ref, cb = null) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (cb) return cb()
        hideModal()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
