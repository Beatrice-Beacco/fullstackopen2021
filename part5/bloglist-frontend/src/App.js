import React, { useState, useEffect } from 'react'

//Import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedForm from './components/LoggedForm'
import Toggable from './components/Toggable'

//Import services
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
    if (user) {
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [[], user])

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
      setErrorMessage(['Logged in succesfully', 'green'])
      setTimeout(() => { setErrorMessage(null) },
        5000)
    } catch (exception) {
      setErrorMessage(['Wrong credentials', 'red'])
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

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      blogService.create(newBlog)

      setErrorMessage(['You created a new blog ' + newBlog.title, 'green'])
      setTimeout(() => { setErrorMessage(null) }, 5000)
    } catch (err) {
      setErrorMessage(['An error occurred creating the blog: ' + err.message, 'red'])
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  ///////////Helper Functions

  const loginForm = () => {
    return (
      <LoginForm handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    )
  }

  const loggedForm = () => {
    return (
      <div>
        Logged as {user.username} < button onClick={(e) => handleLogout(e)} > Logout</button >
        <br />
        <br />
        <Toggable buttonLabel="Create a new blog">
          <LoggedForm handleSubmit={handleSubmit}
            handleTitle={({ target }) => setTitle(target.value)}
            handleAuthor={({ target }) => setAuthor(target.value)}
            handleUrl={({ target }) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
          />
        </Toggable>
        <br />
      </div>
    )
  }

  const sortedBlogs = blogs.sort((firstItem, secondItem) => secondItem.likes - firstItem.likes);

  //Contitionally renders the helper functions
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        loggedForm()
      }

      {
        sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
    </div>
  )
}

export default App