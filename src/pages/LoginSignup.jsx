import { useState } from 'react'
import { userService } from '../services/user.service'

export function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false)
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

  function handleChange({ target }) {}

  return (
    <section className="login-page">
      <div className="main-container flex column align-center justify-center">
        <h1 className="main-title">Welcome to monday.com</h1>
        <h3 className="secondary-title">Get started - it's free. No credit card needed.</h3>

        <form className="login-form">
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          {isSignup && (
            <input
              type="text"
              name="fullname"
              value={credentials.fullname}
              placeholder="Full name"
              onChange={handleChange}
              required
            />
          )}
          <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
      </div>

      <img
        src="/assets/img/login-page-img.avif"
        alt="Monday login page image"
        className="login-img"
      ></img>
    </section>
  )
}
