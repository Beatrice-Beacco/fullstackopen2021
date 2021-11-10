import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteEntry, addNew} from './reducers/anecdoteReducer'
import {addMessage, removeMessage} from './reducers/notificationReducer'
import NewEntry from './components/NewEntry'
import Entry from './components/Entry'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (event, entry) => {
    event.preventDefault()
    dispatch(voteEntry(entry.id))
    dispatch(addMessage("You voted for \"" + entry.content + "\""))
    setTimeout(() => dispatch(removeMessage()), 5000);
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
      <Notification />
      {anecdotes.map(anecdote =>
        <Entry entry={anecdote} 
        handleClick={(e) => vote(e, anecdote)} />
         
      )}

      <NewEntry handleSubmit={addEntry}/>

    </div>
  )
}

export default App