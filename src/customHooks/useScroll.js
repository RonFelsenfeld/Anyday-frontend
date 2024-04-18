import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { hideModal } from '../store/actions/system.actions'

export function useScroll(el) {
  const modal = useSelector(storeState => storeState.systemModule.modal)

  useEffect(() => {
    if (!modal.isOpen) return

    el.addEventListener('scroll', () => {
      if (modal.isOpen) hideModal()
    })

    return () => {
      el.removeEventListener('scroll', hideModal)
    }
  }, [modal.isOpen])
}
