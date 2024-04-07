import { createStore, combineReducers } from 'redux'
import { boardReducer } from './reducers/board.reducer'

const rootReducer = combineReducers({
  boardModule: boardReducer
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
  
export const store = createStore(rootReducer, middleware)