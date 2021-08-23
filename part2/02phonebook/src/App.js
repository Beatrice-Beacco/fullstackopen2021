import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Import my module
import numberService from './services/numbers.js'

//Import my components
import Numbers from './components/Numbers'
import FoundResults from './components/FoundResults'
import Field from './components/Field'

const App = () => {

//States
const [persons, setPersons] = useState([]) //list of total entries
const [newName, setNewName] = useState('') //name input field
const [newNumber, setNewNumber] = useState('') //number input field
const [searchResults, setSearchResults] = useState([]) //search input field

//Fetches the data from db.json as sets it as the persons state
const hook = () => {
  numberService.getAll().then((initialDb) => setPersons(initialDb))
}

useEffect(hook,[])

console.log(persons);

//Receives the event to use preventDefault, the function to change the desired state
//and the ID of the field to get the user imput
//Returns the action of setting the content of the user input to the respective state
//of the state handler function
const addNew = (event, handleState, id) => {
  event.preventDefault()
  let content = document.getElementById(id).value
  return handleState(content)
}

//Receives the event object (to prevent the reload of the page) and the id of the entry to delete
//Makes a request to delete the entry, then makes a request to receive the updated list from the database
//And sets it as the persons state
const deleteEntry = (event, id) =>{
  event.preventDefault()
  numberService.deleteNumber(id)
  .then(()=>{
    numberService.getAll()
    .then((list)=> setPersons(list))
  })
}



//Searches the array with find to see if the user input set in newName aldready exists
//in the array
//If a result is returned, returns a popup to alert the user
//If undefined is returned: 
//If both user inputs are set, both are added to the json database through the HTTP POST method
//method and set to the state through the state handler function
//If one or both inputs are not set, returns a popup to alert the user and updates the number in the database
const updateList = (event) => {
  event.preventDefault();

  const personSearch = persons.find((element) => (element['name'] === newName))

    if(newName && newNumber){ //If both parameters are set
      if (personSearch) { //And if the name is already present, opens a prompt to confirm user input, then sends a put request to the server
        const userInput = window.confirm('The name ' + newName + ' is already present! Do you want to replace the number?')
        if (userInput){
          const updatedEntry = {...personSearch, number: newNumber}
          numberService.update(personSearch.id, updatedEntry)
          .then(() => numberService.getAll()) //Fetches the updated data
          .then((updatedList) => setPersons(updatedList)) //And updates the persons state
        }
      } else {
      const newId = persons.reduce((biggest, element)=>{ //Calculates the largest id so we can set the biggest number +1 to avoid duplicates
        console.log(biggest);
        return(Math.max(biggest, element.id))}, 0)
      const newEntry = { 'name': newName, 'number': newNumber, 'id': newId+1}
      numberService.create(newEntry).then(addedNumber => setPersons([...persons, addedNumber]))
      }
    } else { //If both fields arenot set alerts the user
      return (window.alert('Please, complete both fields!'))
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
      <Numbers list={persons} handler={deleteEntry}/>
    </div>
  )
}

export default App