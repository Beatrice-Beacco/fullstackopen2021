import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteEntry, addNew} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (event, id) => {
    event.preventDefault()
    dispatch(voteEntry(id))
  }

  const addEntry = (event) => {
    event.preventDefault()
    const content = event.target.newEntry.value
    event.target.newEntry.value = ''
    dispatch(addNew(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={(e) => vote(e, anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addEntry}>
        <div><input name="newEntry"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App