import React from 'react'

//Maps all the elements in the numbers array and puts them in a list
const Numbers = ({list, handler}) => {
    return (
        <div>
            {list.map((entry) => {
                return (
                    <li key={entry.id}>
                        {entry.name} - Number: {entry.number} <button onClick={(e)=>handler(e, entry.id, entry.name)}>Delete</button>
                    </li>)
            })}
        </div>
    )
}

export default Numbers