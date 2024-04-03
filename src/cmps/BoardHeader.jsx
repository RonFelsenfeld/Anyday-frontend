import { Favorite, Info } from '../services/svg.service'
import { BoardControls } from './BoardControls'

export function BoardHeader() {
  return (
    <header className="board-header">
      <div className="details-container flex align-center justify-between">
        <div className="title-container flex align-center">
          <h1 className="board-title">Frontend</h1>
          <button className="btn">
            <Info />
          </button>
          <button className="btn">
            <Favorite />
          </button>
        </div>

        <button className="activity-container flex align-center">
          Activity
          {/* CHANGE TO ACTUAL MEMBERS */}
          <div className="img-container">
            <img
              src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/atar_ofxln7.jpg"
              alt="User img"
              className="user-img"
            />

            <img
              src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168995/ron_hzfvru.jpg"
              alt="User img"
              className="user-img"
            />

            <img
              src="https://res.cloudinary.com/df6vvhhoj/image/upload/v1712168994/ido_ds25mn.jpg"
              alt="User img"
              className="user-img"
            />
          </div>
        </button>
      </div>

      <BoardControls />
    </header>
  )
}
