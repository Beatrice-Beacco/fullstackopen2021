import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteEntry, addNew} from './reducers/anecdoteReducer'
import NewEntry from './components/NewEntry'
import Entry from './components/Entry'

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
        <Entry entry={anecdote} 
        handleClick={(e) => vote(e, anecdote.id)} />
         
      )}

      <NewEntry handleSubmit={addEntry}/>

    </div>
  )
}

export default App