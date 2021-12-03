import React from 'react'
import {
  useHistory
} from 'react-router-dom'
import  { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newContent = content.value
    const newAuthor = author.value
    const newInfo = info.value

    props.addNew({
      content: newContent,
      author: newAuthor,
      info: newInfo,
      votes: 0
    })
    history.push('/')
  }

  const resetFields = (e) => {
    e.preventDefault()
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info}/>
        </div>
        <button>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew