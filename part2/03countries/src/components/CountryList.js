import React from 'react'

//Renders the list of possible countries searched and the respective button
const CountryList = ({ list, handler, clickFunction }) => {
    return (
        list.map(function (element, index) {
            return (
                <div key={index}>
                    {element.name} <button type="button" onClick={() => { clickFunction(element, handler) }}>Show</button>
                </div>
            )
        })
    )
}

export default CountryList