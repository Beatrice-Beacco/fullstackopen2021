import React, { useState, useEffect, useRef } from 'react'
import Toggable from './Toggable'

const Blog = ({ blog }) => {

  const [toggle, setToggle] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog);

  const shownInfo = () => {
    return (
      <>
        <button onClick={() => setToggle(false)}>Hide</button>
    Url: { blog.url} <br />
    Likes: { blog.likes} <button>Like</button><br />
    Author: { blog.users.author} <br />
      </>
    )
  }

  const toggleInfo = () => {
    return (
      <>
        <button onClick={() => setToggle(true)}>Show</button>
      </>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {toggle === false ?
        toggleInfo() :
        shownInfo()
      }

    </div>
  )
}

export default Blog