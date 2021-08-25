import React from 'react'
import Weather from './Weather'

//If there is an element in the showCountry state, renders all the info of a single country and calls the Weather component
const FullCountry = ({ country, weather }) => {
    if (!(country.length === 0)) {
        return (
            <div>
                <h1>{country.name}</h1>
                Capital: {country.capital}<br />
                Population: {country.population}<br />
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(function (language, index) {
                        return (
                            <li key={index}>{language.name}</li>
                        )
                    })}
                </ul>
                <img src={country.flag} width='400' height='200' />
                <Weather place={country.name} weatherRes={weather} />
            </div>
        )
    } else {
        return (null)
    }
}


export default FullCountry