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
      Url: {blog.url}<br />
      Likes: {blog.likes}<br />
      Author: {blog.users.author}
    </div>
  )
}

export default Blog