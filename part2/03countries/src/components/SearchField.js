import React from 'react'

//Component for the search text box
const SearchField = ({ stateHandler, database, eventHandler }) => {
    return (
        <>
            <input id='search' onChange={(e) => eventHandler(e, stateHandler, 'search', database)} />
        </>
    )
}

export default SearchField