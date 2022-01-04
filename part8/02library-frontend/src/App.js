
import React, { useState } from 'react'
import {useApolloClient } from "@apollo/client";

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const loginButton = () => (
    <>
      <button onClick={() => setPage("login")}>Login</button>
    </>
  );
  const loggedUserDisplayButtons = () => (
    <>
    <button onClick={() => setPage("add")}>Add Book</button>
    <button onClick={() => logoutAction()}>Logout</button>
    </>
  );

  const logoutAction = () => {
      setToken(null);
      localStorage.clear();
      client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token ? 
        loggedUserDisplayButtons()
        : loginButton()
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />      
      
      <Login
        show={page === 'login'}
        tokenHandler= {setToken}
      />
    </div>
  )
}

export default App