import { Link } from 'react-router-dom'
import { GoToArrow } from '../services/svg.service'

export function HomePage() {
  return (
    <section className="home-page">
      <h1 className="main-title">Your go-to work platform</h1>
      <h2 className="secondary-title">
        Run all your work on one platform with customizable <br /> products the scale with your
        needs
      </h2>

      <Link to={'/board'}>
        <button className="btn-cta flex align-center">
          <span>Get Started</span>
          <GoToArrow />
        </button>
      </Link>
    </section>
  )
}
