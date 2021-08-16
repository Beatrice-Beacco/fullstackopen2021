import React, {useState, useEffect} from 'react'
import axios from 'axios'

function App() {

//States
const [countries, setCountries] = useState([])
const [query, setQuery] = useState([]);

//Get data from API and sets it to the variable countries
const hook = () => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
}

useEffect(hook, [])

  //Renders the components
  return (
    <div>
      Search countries: <SearchField stateHandler={setQuery} database={countries} />
      <Results query={query}/>
    </div>
  );

}

//Component for the search text box
const SearchField = ({stateHandler, database}) => {
  return(
    <>
      <input id='search' onChange={()=>updateSearch(stateHandler, 'search', database)} />
    </>
  )
}

//Arguments: stateHandler for the query state, the id of the search field, list of contries
//Gets the text of the input field and filters the database with the input. The result is then set as the query state
//thanks to the event handler
const updateSearch = (sh, id, database) => {
  try{
  let searched = document.getElementById(id).value;
  let queryResult = database.filter((country) => {
      return country.name.search(searched) >= 0
    })
  return (
    sh(queryResult)
  )
  } catch (err) {
    console.log(err)
  }
}


//Calls the componets to render the results bases on the number of elements in the search result (query) array
const Results = ({query}) =>{
  if(query.length <= 10) { //If the length of the list equals or is less than 10
  if (query.length == 1) { //And if it's exacyly one
    return(<FullCountry list={query} index={0}/>) //Calls the component to render a single country
  } else { //If it's more than one
    return(<CountryList list={query}/>) //Calls the component to render a list
  } 
  } else { //If it's more than then
    return(<div>Too many countries! Narrow your search</div>) //Alert the user there are too many possible results
}
}

//Renders all the info of a single country
const FullCountry = ({list, index}) => {
  const country = list[index]
  return(
    <div>
      <h1>{country.name}</h1>
      Capital: {country.capital}<br/>
      Population: {country.population}<br/>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(function (language){
          return(
            <li>{language.name}</li>
          )
        })}
      </ul>
      <img src={country.flag} width='400' height='200'/>
    </div>
  )

}

//Renders the list of possible countries searched
const CountryList = ({list}) =>{
  return(
  list.map(function (country) {
    return (
      <div>
        {country.name}
      </div>
    )
  })
  )
}


export default App;
