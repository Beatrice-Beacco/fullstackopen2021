import React, { useState } from 'react'

//Import my components
import Numbers from './components/Numbers'
import FoundResults from './components/FoundResults'
import Field from './components/Field'

const App = () => {
//States
const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
]) //list of total entries
const [newName, setNewName] = useState('') //name input field
const [newNumber, setNewNumber] = useState('') //number input field
const [searchResults, setSearchResults] = useState([]) //search input field

//Receives the event to use preventDefault, the function to change the desired state
//and the ID of the field to get the user imput
//Returns the action of setting the content of the user input to the respective state
//of the state handler function
const addNew = (event, handleState, id) => {
  event.preventDefault()
  let content = document.getElementById(id).value

  return handleState(content)
}

//Searches the array with find to see if the user input set in newName aldready exists
//in the array
//If a result is returned, returns a popup to alert the user
//If undefined is returned: 
//If both user inputs are set, both are added to the persons array through the concat
//method and set to the state through the state handler function
//If one or both inputs are not set, returns a popup to alert the user
const updateList = (event) => {
  event.preventDefault();

  const personSearch = persons.find((element) => (element['name'] === newName))

  if (personSearch) {
    return(window.alert('The name ' + newName + ' is already present!'))
  } else {
    if(newName && newNumber){
    return setPersons(persons.concat({ 'name': newName, 'number': newNumber}))
    } else {
      return (window.alert('Please, complete both fields!'))
    }
  }
}

//Gets the user imput from the search field, and filters the persons array. If at least
//a match is found in each element through the search method, returns true.
//At the end sets the searchResults state with the filtered array.
const searchList = () => {
  let searched = document.getElementById("search").value
  let results = persons.filter((element)=>{
   return (element['name'].search(searched) > -1) ? true : false //(i know this notation is useless but I wanted to use it atleast once in my life lmao)
  })
  return setSearchResults(results)
}

//Renders all components and fields
  return (
    <div>
      <center><h1>Phonebook</h1></center>
      <h2>Search</h2>
      <input id="search" onChange={searchList}/><br/>
      Results: {<FoundResults results={searchResults}/>}
      <h2>Add New</h2>
      <form onSubmit={updateList}>
        <Field text="Name" id="name" updateFunction={addNew} stateHandler={setNewName}/>
        <Field text="Number" id="number" updateFunction={addNew} stateHandler={setNewNumber}/>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers list={persons}/>
    </div>
  )
}

export default App