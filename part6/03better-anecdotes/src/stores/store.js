import { createStore, combineReducers } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer.js'
import notificationReducer from '../reducers/notificationReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

export default createStore(reducer, composeWithDevTools())