import React, { useState, useEffect, useRef } from 'react'
import Toggable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [toggle, setToggle] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const shownInfo = () => {
    return (
      <>
        <button onClick={() => setToggle(false)}>Hide</button><br />
    Url: { blog.url} <br />
    Likes: { blog.likes} <button onClick={() => handleLike()}>Like</button><br />
    Author: { blog.users.author} <br />
      </>
    )
  }

  const handleLike = () => {

    const updated = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: (blog.likes + 1),
      user: blog.users
    }

    blogService.update(updated, blog.id)
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