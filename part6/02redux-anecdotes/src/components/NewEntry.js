import React from 'react'

const NewEntry = ({handleSubmit}) => {
  
  return (
    <div>
        <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="newEntry"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewEntry