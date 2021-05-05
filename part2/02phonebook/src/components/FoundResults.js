import React from 'react'

//Maps the array with the search results and puts them in a line
const FoundResults = ({ results }) => {
    return (
        <>
            {results.map((entry) => {
                return ' --- ' + entry['name'] + ': ' + entry['number']
            })}
        </>
    )
}

export default FoundResults