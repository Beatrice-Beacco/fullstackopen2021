import React, { useState, useEffect, useRef } from 'react'
import Toggable from './Toggable'
import { useState } from 'react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog);

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<br />
      <Toggable buttonLabel="View">
        Url: {blog.url}<br />
      Likes: {blog.likes}<br />
      Author: {blog.users.author}
      </Toggable>
    </div>
  )
}

export default Blog