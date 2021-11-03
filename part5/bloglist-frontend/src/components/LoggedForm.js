import React from 'react'

const LoggedForm = ({ handleSubmit, title, author, url, handleTitle, handleAuthor, handleUrl }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create new</h2>
    Title: <input type="text" value={title} name="Title"
          onChange={handleTitle} /> <br />
    Author: <input type="text" value={author} name="Author"
          onChange={handleAuthor} /> <br />
    Url: <input type="text" value={url} name="Url"
          onChange={handleUrl} /> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoggedForm