import { Link } from 'react-router-dom'

export function DeletedPage() {
  return (
    <div className="img-container-trash flex align-center justify-center">
      <div>
        <img src="/assets/img/empty_state_deleted_3.svg" alt="garbage" className="trash-img " />
        <div className="second-section flex column align-center">
          <h2 className="main-info-trash">This board has been deleted</h2>
          <span>Recently deleted boards can not be restored </span>
          <Link to="/board">
            <button className="back-to-main">Back to workspace</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
