import React from 'react'

//Maps all the elements in the numbers array and puts them in a list
const Numbers = ({ list }) => {
    return (
        <div>
            {list.map((entry) => {
                return (
                    <li key={entry.name}>
                        {entry.name} - Number: {entry.number}
                    </li>)
            })}
        </div>
    )
}

export default Numbers