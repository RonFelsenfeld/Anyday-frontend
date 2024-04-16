import 'animate.css'
import { useRef } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Google } from '../services/svg.service'
import { useClickOutside } from '../customHooks/useClickOutside'
import { googleService } from '../services/google.service'

export function GoogleModal({ setIsIntegrationModalOpen }) {
  const modalRef = useRef()
  useClickOutside(modalRef, () => setIsIntegrationModalOpen(false))

  const supabase = useSupabaseClient() // Communicate with Supabase

  return (
    <>
      <div className="google-modal-backdrop animate__animated animate__fadeIn"></div>
      <section
        ref={modalRef}
        className="google-modal flex column animate__animated animate__fadeIn"
      >
        <header className="modal-header flex align-center justify-center">
          <img src="/assets/img/logo.png" alt="Anyday logo" className="modal-logo" />

          <h1 className="main-modal-title">Integrate with your Google account.</h1>
        </header>

        <h3 className="secondary-modal-title">
          Anyday can work together with your personal workspaces, such as Gmail and Google calendar.
        </h3>

        <button
          className="btn-sign-in flex align-center justify-center"
          onClick={() => googleService.signIn(supabase)}
        >
          <Google />
          <span>Sign in with Google</span>
        </button>

        <p className="integration-desc">
          To enjoy our integration with Google,
          <span> please sign in with your Google account </span>& make sure
          <span> you are logged in to Anyday.</span>
        </p>
      </section>
    </>
  )
}
