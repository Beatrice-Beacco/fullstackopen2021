import React, {useState, useEffect} from 'react'
import { useQuery, useLazyQuery } from "@apollo/client";

import {ME, BOOKS_BY_GENRE} from '../queries'

import BookTable from './BookTable'

const Recommended = ({show}) => {
    const result = useQuery(ME);
    const [getBooksByGenre, resultBooksByGenre] = useLazyQuery(BOOKS_BY_GENRE);
    const [booksToDisplay, setBooksToDisplay] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
      if (result.data) {
        setUser(result.data.me);
      }
    }, [result]);

  useEffect(() => {
    if(user){
      getBooksByGenre({ variables: { genre: user.favoriteGenre } });
    if (resultBooksByGenre.data) {
      const returnedQuery = resultBooksByGenre.data.allBooks
      setBooksToDisplay(returnedQuery);
    }
  }
  }, [resultBooksByGenre.data, user]);
    
    if (!show || !user) {
      return null;
    }

    if (result.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <h1>Reccomendations</h1>

        <p>
          Books for your favorite genre: <b>{user.favoriteGenre}</b>
        </p>

        <BookTable books={booksToDisplay}/>
      </div>
    );
};

export default Recommended