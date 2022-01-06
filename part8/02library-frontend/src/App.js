import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";
import Login from "./components/Login";

import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(
        'Book "' + subscriptionData.data.bookAdded.title + '" was added.'
      );
    },
  });

  useEffect(() => {
    const checkIfTokenExists = localStorage.getItem("phonenumbers-user-token");
    if (checkIfTokenExists) {
      setToken(checkIfTokenExists);
    }
  }, []);

  const loginButton = () => (
    <>
      <button onClick={() => setPage("login")}>Login</button>
    </>
  );
  const loggedUserDisplayButtons = () => (
    <>
      <button onClick={() => setPage("add")}>Add Book</button>
      <button onClick={() => setPage("recoms")}>Reccommended</button>
      <button onClick={() => logoutAction()}>Logout</button>
    </>
  );

  const logoutAction = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? loggedUserDisplayButtons() : loginButton()}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recoms"} />

      <Login show={page === "login"} tokenHandler={setToken} />
    </div>
  );
};

export default App;
