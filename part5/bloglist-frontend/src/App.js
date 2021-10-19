import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //New blog states
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [url, setUrl] = useState()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  //If there is a local storage for user then it is set as the user state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  //Logs in the user through the login service, sets it as the local storage
  //and sets it as the user state, then resets the login fields.
  //Else sets the error message
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) },
        5000)
    }
  }

  //Empities the local storage and the user state
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    console.log(newBlog);

    blogService.create(newBlog)
  }

  ///////////Helper Functions

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username
                   <input type="text" value={username} name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password
                   <input type="password" value={password} name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  const loggedForm = () => {
    return (
      <div>
      <form onSubmit={handleSubmit}>
        Logged as {user.username} <button onClick={(e) => handleLogout(e)}>Logout</button>
        <br/>
        <h2>Create new</h2>
        Title: <input type="text" value={title} name="Title"
          onChange={({ target }) => setTitle(target.value)} /> <br/>
        Author: <input type="text" value={author} name="Author"
          onChange={({ target }) => setAuthor(target.value)} /> <br />
        Url: <input type="text" value={url} name="Url"
          onChange={({ target }) => setUrl(target.value)} /> <br />
        <button type="submit">Submit</button>
      </form>
      </div>
    )
  }

  //Contitionally renders the helper functions
  return (
    <div>
      <h1>Blogs</h1>
      { errorMessage}

      {user === null ?
        loginForm() :
        loggedForm()
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App