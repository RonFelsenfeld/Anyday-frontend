import { Link } from "react-router-dom";
import { GoToArrow, MenuGrid, WorkspaceLogo } from "../services/svg.service";

export function HomePageHeader() {
    return (
        <header className="homepage-header flex justify-between">
            <div className="logo-container flex align-center">
                <button className="btn-logo">
                    <WorkspaceLogo size={25} />
                </button>
                <span className="logo-main">monday</span>
                <span className="logo-secondary">work management</span>
            </div>

            <div className="right-side-container flex">
                <Link to={'/auth'}>
                    <button className="log-in-btn">Log in</button>
                </Link>

                <Link to={'/board'}>
                    <button className="get-started-btn flex align-center">
                        <span>Get Started</span>
                        <GoToArrow />
                    </button>
                </Link>
            </div>
        </header>
    )
}