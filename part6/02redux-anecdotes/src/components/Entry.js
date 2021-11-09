import React from 'react'

const Entry = ({entry, handleClick}) => {
  
  return (
    <div>
        <div key={entry.id}>
          <div>
            {entry.content}
          </div>
          <div>
            has {entry.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    </div>
  )
}

export default Entry