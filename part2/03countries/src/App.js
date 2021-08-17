import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
      Search countries: <SearchField stateHandler={setQuery} database={countries} />
      <Results query={query} countryHandler={setShowCountry} countryState={showCountry} weatherState={weather}/>
      <FullCountry country={showCountry} weather={weather}/>
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
  let searched = document.getElementById(id).value;
  let queryResult = database.filter((country) => {
      return country.name.search(searched) >= 0
    })
  return (
    sh(queryResult)
  )
}


//Calls the componets to render the results bases on the number of elements in the search result (query) array
const Results = ({ query, countryHandler}) =>{
  if (query.length > 1 && query.length <= 10) { //If the length of the list is between 2 and 10 renders the list
    return (<><CountryList list={query} handler={countryHandler}/></>)
  } else if (query.length > 10) { //If it's more than 10
    return (<div>Too many countries! Narrow your search</div>) //Alert the user there are too many possible results
  } else { //If the length is 0 or 1 renders nothing
    return(null)
  }
}

//Renders the list of possible countries searched and the respective button
const CountryList = ({ list, handler}) => { 
  return (
    list.map(function (element, index) {
      return (
        <div key={index}>
          {element.name} <button type="button" onClick={()=>{setInfo(element, handler)}}>Show</button>
        </div>
      )
    })
  )
}

//Sets to the showCountry state the contry selected via the button press
const setInfo = (info, handler) => {
  return(
    handler(info)
  )
}

//If there is an element in the showCountry state, renders all the info of a single country and calls the Weather component
const FullCountry = ({country, weather}) => {
  if (!(country.length === 0)){
  return(
    <div>
      <h1>{country.name}</h1>
      Capital: {country.capital}<br/>
      Population: {country.population}<br/>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(function (language, index){
          return(
            <li key={index}>{language.name}</li>
          )
        })}
      </ul>
      <img src={country.flag} width='400' height='200'/>
      <Weather place={country.name} weatherRes={weather}/>
    </div>
  )
  } else{
    return(null)
  }
}


//If the API call is successful renders the weather data
const Weather = ({place, weatherRes}) => {
  if (weatherRes.success) {
  return(
  <div>
    <h2>Weather in {place.name}</h2>
    <b>Temperature: </b> {weatherRes.current.temperature}<br />
    <img src={weatherRes.current.weather_icons} /><br />
    <b>Wind: </b> {weatherRes.current.weather_descriptions.wind_speed} direction {weatherRes.current.weather_descriptions.wind_dir}
  </div>
  )
} else {
  return(null)
}
}

export default App;
