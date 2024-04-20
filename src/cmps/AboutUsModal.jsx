import { useRef } from 'react'

import { Email, Github, Linkedin } from '../services/svg.service'
import { showSuccessMsg } from '../services/event-bus.service'

import { useClickOutside } from '../customHooks/useClickOutside'

import { hideModal, showModal } from '../store/actions/system.actions'
import { BOTTOM_CENTER } from '../store/reducers/system.reducer'

export function AboutUsModal({ setIsAboutUsModalOpen }) {
  const modalRef = useRef()
  const currOpenMenu = useRef(null)

  useClickOutside(modalRef, () => setIsAboutUsModalOpen(false))

  function toggleMenu(menuType, options, { currentTarget }) {
    const cmpInfo = {
      type: 'optionsMenu',
      options,
    }
    showModal(currentTarget, BOTTOM_CENTER, cmpInfo, true)
  }

  function handleIconClick(ev, type, options) {
    toggleMenu(type, options, ev)
    currOpenMenu.current = type
  }

  function navToLink(link) {
    window.open(link, '_blank')
  }

  async function onEmailClick(email, name) {
    try {
      await navigator.clipboard.writeText(email)
      showSuccessMsg(`${name}'s email was copied to clipboard`)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const users = {
    ido: {
      imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg',
      github: 'https://github.com/yotvat',
      linkedin: 'https://www.linkedin.com/in/ido-yotvat-52940020b/',
      email: 'idooy11@gmail.com',
    },
    atar: {
      imgUrl:
        'https://res.cloudinary.com/dkmvaqxkl/image/upload/v1713439122/of43ydrlcijxmzwcpmsd.jpg',
      github: 'https://github.com/AtarMor',
      linkedin: 'https://www.linkedin.com/in/atar-mor-535388103/',
      email: 'atarmor92@gmail.com',
    },
    ron: {
      imgUrl: 'https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg',
      github: 'https://github.com/RonFelsenfeld',
      linkedin: 'https://www.linkedin.com/in/ron-felsenfeld-73553a261/',
      email: 'ronfelsenfeld@gmail.com',
    },
  }

  const githubOptions = [
    {
      title: 'Ido Yotvat',
      func: () => {
        navToLink(users.ido.github)
      },
    },
    {
      title: 'Atar Mor',
      func: () => {
        navToLink(users.atar.github)
      },
    },
    {
      title: 'Ron Felsenfeld',
      func: () => {
        navToLink(users.ron.github)
      },
    },
  ]

  const linkedinOptions = [
    {
      title: 'Ido Yotvat',
      func: () => {
        navToLink(users.ido.linkedin)
      },
    },
    {
      title: 'Atar Mor',
      func: () => {
        navToLink(users.atar.linkedin)
      },
    },
    {
      title: 'Ron Felsenfeld',
      func: () => {
        navToLink(users.ron.linkedin)
      },
    },
  ]

  const emailOptions = [
    {
      title: 'Ido Yotvat',
      func: () => onEmailClick(users.ido.email, 'Ido'),
    },
    {
      title: 'Atar Mor',
      func: () => onEmailClick(users.atar.email, 'Atar'),
    },
    {
      title: 'Ron Felsenfeld',
      func: () => onEmailClick(users.ron.email, 'Ron'),
    },
  ]

  return (
    <>
      <div className="about-us-modal-backdrop animate__animated animate__fadeIn"></div>

      <section ref={modalRef} className="about-us-modal animate__animated animate__fadeIn">
        <h1 className="main-title">Welcome to Anyday</h1>

        <div className="flex column justify-between">
          <img src="/assets/img/about-us.png" alt="Our team" className="about-us-img" />

          <div className="contact-container flex align-center justify-center">
            <button
              className="btn-contact"
              onClick={ev => handleIconClick(ev, 'github', githubOptions)}
            >
              <Github />
            </button>

            <button
              className="btn-contact"
              onClick={ev => handleIconClick(ev, 'linkedin', linkedinOptions)}
            >
              <Linkedin />
            </button>

            <button
              className="btn-contact"
              onClick={ev => handleIconClick(ev, 'email', emailOptions)}
            >
              <Email />
            </button>
          </div>
        </div>

        <article className="content-container flex column">
          <p className="content-paragraph">
            Built on the robust foundations of React, Node.js, and MongoDB, Anyday offers a seamless
            and intuitive experience of workspace management for individuals and teams alike.
          </p>

          <p className="content-paragraph">
            Who are we? We are a passionate team, fueled by motivation and innovation. Our two-week
            sprint was an intense journey of creativity and collaboration, resulting in the birth of
            Anyday.
          </p>

          <p className="content-paragraph">
            We want to acknowledge that while Anyday draws inspiration from monday.com and is
            created for educational purposes, all rights are reserved to the original creators. We
            respect their innovation and contributions to the field.
          </p>

          <p className="content-paragraph">Thank you for joining us on this journey.</p>

          <p className="content-paragraph">Ido Yotvat, Atar Mor and Ron Felsenfeld.</p>
        </article>
      </section>
    </>
  )
}
