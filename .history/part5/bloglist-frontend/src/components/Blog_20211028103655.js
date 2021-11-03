import React from 'react'
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
      {blog.title} {blog.author}  <button>View</button>
      {blog.url}
      {blog.likes}
    </div>
  )
}

export default Blog