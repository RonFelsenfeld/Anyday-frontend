import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { userService } from '../services/user.service'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { uploadFile } from '../services/cloudinary-service'
import { GoToArrow } from '../services/svg.service'
import { login, signup } from '../store/actions/user.actions'
import { socketService } from '../services/socket-service'

export function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  const navigate = useNavigate()

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    submitCredentials(credentials)
  }

  function submitCredentials(credentials) {
    isSignup ? handleSignup(credentials) : handleLogin(credentials)
  }

  async function handleLogin(credentials) {
    try {
      const user = await login(credentials)
      socketService.login(user._id)
      showSuccessMsg(`Welcome back, ${user.fullName}`)
    } catch (err) {
      console.log('Login -> Has issues login', err)
      showErrorMsg('Could not login, try again later.')
    } finally {
      navigate('/board')
    }
  }

  async function handleSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome, ${user.fullName}`)
    } catch (err) {
      console.log('Signup -> Has issues signup', err)
      showErrorMsg('Could not sign-in, try again later.')
    } finally {
      navigate('/board')
    }
  }

  async function handleAddImage(ev) {
    try {
      const { url } = await uploadFile(ev)
      setCredentials(prevCreds => ({ ...prevCreds, imgUrl: url }))
    } catch (err) {
      console.log('Add profile image -> Has issues adding image', err)
      showErrorMsg('Could not upload your image')
    }
  }

  function getImage() {
    return credentials.imgUrl ? credentials.imgUrl : '/assets/img/user-avatar.svg'
  }

  return (
    <section className="login-page">
      <Link to={'/board'} className="link-go-back">
        <button className="btn-go-back">
          <GoToArrow />
        </button>
      </Link>

      <div className="main-container flex column ">
        <div className="form-container flex column align-center justify-center">
          <div className="title-container flex">
            <h1 className="main-title">Welcome to</h1>
            <img className="logo" src="/assets/img/A-logo.png" />
            <h1 className="logo-title">nyday</h1>
          </div>
          <h3 className="secondary-title">
            {`${
              isSignup
                ? "Get started - it's free. No credit card needed."
                : 'Log in to your account'
            }`}
          </h3>

          <form onSubmit={handleSubmit} className="login-form flex column align-center">
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleChange}
              required
              autoFocus
              autoComplete="off"
            />

            {isSignup && (
              <>
                <input
                  type="text"
                  name="fullName"
                  className="login-input"
                  placeholder="Enter your full name"
                  value={credentials.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  pattern="^05\d{8}$"
                  className="login-input"
                  placeholder="Enter your phone number"
                  value={credentials.phoneNumber}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </>
            )}

            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />

            {isSignup && (
              <div className="img-input-container flex align-center">
                <span>Add profile picture</span>

                <label htmlFor="img" className="label-container">
                  <img src={getImage()} alt="User default image" />
                </label>

                <input
                  type="file"
                  name="img"
                  id="img"
                  className="login-input"
                  onChange={handleAddImage}
                  hidden
                />
              </div>
            )}

            <button className="btn-login">Login</button>
          </form>
        </div>

        <p className="already-user flex ">
          {`${isSignup ? 'Already have an account?' : "Don't have an account yet?"}`}
          <span onClick={() => setIsSignup(!isSignup)}>{`${
            isSignup ? 'Log in ' : 'Sign up'
          }`}</span>
        </p>
      </div>

      <img src="/assets/img/login-page-img.avif" alt="login page image" className="login-img"></img>
    </section>
  )
}
