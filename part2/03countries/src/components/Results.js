import React from 'react'
import CountryList from './CountryList'

//Calls the componets to render the results bases on the number of elements in the search result (query) array
const Results = ({ query, countryHandler, click }) => {
    if (query.length > 1 && query.length <= 10) { //If the length of the list is between 2 and 10 renders the list
        return (<><CountryList list={query} handler={countryHandler} clickFunction={click} /></>)
    } else if (query.length > 10) { //If it's more than 10
        return (<div>Too many countries! Narrow your search</div>) //Alert the user there are too many possible results
    } else { //If the length is 0 or 1 renders nothing
        return (null)
    }
}

export default Results