import {combineReducers,createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import Token from './Token'


const rootReducer = combineReducers({
  Token
})

const store = createStore(
  rootReducer,
  composeWithDevTools()
)

export default store;