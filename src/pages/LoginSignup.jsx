import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { login, signup } from '../store/actions/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

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
    isSignup ? handleSignin(credentials) : handleLogin(credentials)
  }

  async function handleLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome, ${user.fullName}`)
    } catch (err) {
      showErrorMsg('Could not login, try again later.')
    } finally {
      navigate('/board')
    }
  }

  async function handleSignin(credentials) {
    try {
      const user = await signup()
      showSuccessMsg(`Welcome back, ${user.fullName}`)
    } catch (err) {
      showErrorMsg('Could not sign-in, try again later.')
    } finally {
      navigate('/board')
    }
  }

  return (
    <section className="login-page">
      <div className="main-container flex column ">
        <div className="form-container flex column align-center justify-center">
          <h1 className="main-title">Welcome to monday.com</h1>
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
            )}

            <button className="btn-login">Login</button>
          </form>
        </div>

        <p className="already-user flex ">
          {`${isSignup ? 'Already have an account?' : "Don't have an account yet?"}`}
          <span onClick={() => setIsSignup(!isSignup)}>{`${isSignup ? 'Sign up' : 'Log in'}`}</span>
        </p>
      </div>

      <img
        src="/assets/img/login-page-img.avif"
        alt="Monday login page image"
        className="login-img"
      ></img>
    </section>
  )
}
