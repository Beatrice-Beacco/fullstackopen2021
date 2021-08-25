import React, {useState, useEffect} from 'react'
import axios from 'axios'

//Import my components
import SearchField from './components/SearchField'
import Results from './components/Results'
import FullCountry from './components/FullCountry'

//Api key
const api_key = process.env.REACT_APP_API_KEY

function App() {

//States
const [countries, setCountries] = useState([])
const [query, setQuery] = useState([]);
const [showCountry, setShowCountry] = useState([])
const [weather, setWeather] = useState([]);

//Get data from API and sets it to the variable countries
const hook = () => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
}

useEffect(hook, [])

//Gets weather data
const weather_hook = () => {
  axios
    .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + showCountry.name + '\'')
    .then(response => {
      setWeather(response.data)
    })
}

useEffect(weather_hook, [showCountry])

//If there is only one country in the query, else resets showCountry
  const hook_country = () => {
        if(query.length==1){
          setShowCountry(query[0])
        } else {
          setShowCountry([])
        }
      }
  
  useEffect(hook_country, [query])

//Renders the components
  return ( // 
    <div>
      Search countries: <SearchField stateHandler={setQuery} database={countries} eventHandler={updateSearch} />
      <Results query={query} countryHandler={setShowCountry} click={setInfo}/>
      <FullCountry country={showCountry} weather={weather}/>
    </div>
  );

}

//Arguments: stateHandler for the query state, the id of the search field, list of contries
//Gets the text of the input field and filters the database with the input. The result is then set as the query state
//thanks to the event handler
const updateSearch = (ev, sh, id, database) => {
  ev.preventDefault()
  let searched = document.getElementById(id).value;
  let queryResult = database.filter((country) => {
      return country.name.search(searched) >= 0
    })
  return (
    sh(queryResult)
  )
}

//Sets to the showCountry state the contry selected via the button press
const setInfo = (info, handler) => {
  return(
    handler(info)
  )
}

export default App;
