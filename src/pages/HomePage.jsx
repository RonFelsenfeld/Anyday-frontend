import { Link } from 'react-router-dom'
import { GoToArrow, RoundedV } from '../services/svg.service'
import { HomePageHeader } from '../cmps/HomePageHeader'

export function HomePage() {
  return (
    <main className="home-page">
      <HomePageHeader />
      <h1 className="main-title">Your go-to work platform</h1>
      <h2 className="secondary-title">
        Run all your work on one platform with customizable products the scale with your
        needs.
      </h2>

      <ul className='management-options clean-list flex'>
        <li className='creative'>
          <img src="/assets/img/creative.png" alt="Creative"></img>
          <h3>Creative & design</h3>
        </li>

        <li className='ops'>
          <img src="/assets/img/ops.png" alt="Operations"></img>
          <h3>Operations</h3>
        </li>

        <li className='marketing'>
          <img src="/assets/img/marketing.png" alt="Marketing"></img>
          <h3>Marketing</h3>
        </li>

        <li className='projects'>
          <img src="/assets/img/projects.png" alt="Projects"></img>
          <h3>Project management</h3>
        </li>

        <li className='tasks'>
          <img src="/assets/img/tasks.png" alt="Tasks"></img>
          <h3>Task management</h3>
        </li>

        <li className='hr'>
          <img src="/assets/img/HR.png" alt="HR"></img>
          <h3>HR</h3>
        </li>

        <li className='it'>
          <img src="/assets/img/IT.png" alt="IT"></img>
          <h3>IT</h3>
        </li>

        <li className='more'>
          <img src="/assets/img/more.png" alt="more"></img>
          <h3>More <br /> workflows</h3>
        </li>
      </ul>

      <Link to={'/board'}>
        <button className="get-started-btn flex align-center">
          <span>Get Started</span>
          <GoToArrow />
        </button>
      </Link>

      <h4 className='no-credit-card'>No credit card needed   ✦   Unlimited time on Free plan</h4>

      <aside className='middle-part'>
        <header className='middle-part-header'>Step into a world of seamless work experiences,
          powered by a <span>suite of products</span> designed to flex and scale to your way of working.</header>
        <div className='middle-part-container flex'>
          <div className='content-container'>
            <section className='top-features'>
              <div className='logo-container flex align-center'>
                <img className='logo' src="/assets/img/A-logo.png" />
                <h3 className='logo-title'>
                  <span>nyday</span> work management</h3>
              </div>
              <h2 className='secondary-title'>Manage everything from strategy to tasks to exceed your goals</h2>
              <div className='top-features-container'>
                <h3>Top features</h3>
                <ul className='top-fetures-list clean-list'>
                  <li>
                    <RoundedV />
                    <h4>Project management</h4>
                  </li>
                  <li>
                    <RoundedV />
                    <h4>Resource management</h4>
                  </li>
                  <li>
                    <RoundedV />
                    <h4>Requests & approvals</h4>
                  </li>
                  <li>
                    <RoundedV />
                    <h4>Custom workflows</h4>
                  </li>
                </ul>

                <Link to={'/board'}>
                  <button className="get-started-btn flex align-center">
                    <span>Get Started</span>
                    <GoToArrow />
                  </button>
                </Link>
              </div>

            </section>
          </div>
          <div className='img-container'>
            <img src="/assets/img/homepage-img.avif" alt="site-img"></img>
          </div>
        </div>
      </aside>

      <footer className='flex column align-center justify-center'>
        <div className='footer-title flex'>
          <h2 className='main-title'>Deliver your best work <span>with</span></h2>
          <img className="logo" src="/assets/img/A-logo.png" />
          <h2 className='logo-title'>nyday</h2>
        </div>
        <h3 className='secondary-title'>No credit card needed   ✦   Unlimited time on Free plan</h3>
        <Link to={'/board'}>
          <button className="get-started-btn flex align-center">
            <span>Get Started</span>
            <GoToArrow />
          </button>
        </Link>
      </footer>
    </main>
  )
}
