import { useRef } from 'react'
import { useClickOutside } from '../customHooks/useClickOutside'
import { Email, Github, Linkedin } from '../services/svg.service'

export function AboutUsModal({ setIsAboutUsModalOpen }) {
  const modalRef = useRef()

  useClickOutside(modalRef, () => setIsAboutUsModalOpen(false))

  function navToLink(link) {
    window.open(link, '_blank')
  }

  return (
    <>
      <div className="about-us-modal-backdrop animate__animated animate__fadeIn"></div>

      <section
        ref={modalRef}
        className="about-us-modal flex column animate__animated animate__fadeIn"
      >
        <h1 className="main-title">Welcome to Anyday</h1>

        <article className="content-container flex column">
          <p className="content-paragraph">
            In today's dynamic work environments, managing projects, tasks, and communication can be
            overwhelming. That's why we embarked on a journey to create a solution that simplifies
            workspace management for individuals and teams alike.
          </p>

          <p className="content-paragraph">
            Who are we? We are a passionate team, fueled by innovation and driven by the desire to
            make a difference. Our two-week sprint was an intense journey of creativity and
            collaboration, resulting in the birth of Anyday.
          </p>

          <p className="content-paragraph">
            Built on the robust foundations of React, Node.js, and MongoDB, our application offers a
            seamless and intuitive experience. From organizing projects to streamlining
            communication, Anyday is designed to enhance productivity and efficiency.
          </p>

          <p className="content-paragraph">
            Your feedback is invaluable to us. We invite you to explore Anyday and share your
            thoughts with us.
          </p>

          <p className="content-paragraph">
            Furthermore, we want to acknowledge that while Anyday draws inspiration from monday.com
            and is created for educational purposes, all rights are reserved to the original
            creators. We respect their innovation and contributions to the field.
          </p>

          <p className="content-paragraph">Thank you for joining us on this journey.</p>
        </article>

        <div className="contact-container flex align-center">
          <button className="btn-contact">
            <Github />
          </button>

          <button className="btn-contact">
            <Linkedin />
          </button>

          <button className="btn-contact">
            <Email />
          </button>
        </div>
      </section>
    </>
  )
}
