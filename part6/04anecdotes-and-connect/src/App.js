import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {voteEntry, addNew, initializeAnecdotes} from './reducers/anecdoteReducer'
import {setNotification} from './reducers/notificationReducer'
import NewEntry from './components/NewEntry'
import Entry from './components/Entry'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotesService from './services/anecdotes'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
 

  const vote = (event, entry) => {
    event.preventDefault()
    dispatch(voteEntry(entry))
    dispatch(setNotification("You voted for \"" + entry.content + "\"", 5))
  }

  const addEntry = async (event) => {
    event.preventDefault()
    const content = event.target.newEntry.value
    event.target.newEntry.value = ''
    const newAnecdote = await anecdotesService.createNew(content)
    console.log(newAnecdote);
    dispatch(addNew(newAnecdote))
  }

  const renderAll = () => {
    return(
      <div>
        {
        anecdotes.map(anecdote =>
        <Entry entry={anecdote} 
        handleClick={(e) => vote(e, anecdote)} />)
        }
      </div>
    )
  }

  const filterRender = () => {
    const searched = anecdotes.filter((entry) => entry.content.indexOf(filter) > -1)
    console.log("Cercati", searched);
    return(
      <div>
        {
        searched.map(anecdote =>
        <Entry entry={anecdote} 
        handleClick={(e) => vote(e, anecdote)} />)
        }
      </div>
    )
  } 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter dispatch={dispatch}/>
      <Notification />
      {filter == null || filter == "" ? 
        renderAll() :
        filterRender()
      }

      <NewEntry handleSubmit={addEntry}/>

    </div>
  )
}

export default App