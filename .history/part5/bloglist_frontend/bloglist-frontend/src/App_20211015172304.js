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
        Logged as {user.username} <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
    )
  }

  //Contitionally renders the helper functions
  return (
    <div>
      <h2>blogs</h2>
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