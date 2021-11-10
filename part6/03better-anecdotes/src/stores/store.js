import { createStore } from 'redux'
import reducer from '../reducers/anecdoteReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducer, composeWithDevTools())