import React from 'react'

//Creates an input field with an event handler with a passed function and the passed state handler
//function and id as arguments 
const Field = ({ text, id, updateFunction, stateHandler }) => {
    return (
        <div>
            {text}: <input id={id} onChange={(e) => updateFunction(e, stateHandler, id)} />
        </div>
    )
}

export default Field