import React, {useState, useEffect} from 'react'
import {useQuery, useLazyQuery } from '@apollo/client'

import Genres from './Genres'
import BookTable from './BookTable'

import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries';


const Books = (props) => {

  const result = useQuery(ALL_BOOKS) 
  const [getBooksByGenre, resultBooksByGenre] = useLazyQuery(BOOKS_BY_GENRE);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    if(result.data){
      setBookList(result.data.allBooks)
    }
  }, [result.data]); 

  useEffect(() => {
    getBooksByGenre({ variables: { genre: currentGenre } });
    if(resultBooksByGenre.data){
    setBookList(resultBooksByGenre.data.allBooks);
    }
  }, [resultBooksByGenre.data, currentGenre]);

  if (!props.show) {
    return null
  }

  if (resultBooksByGenre.loading || result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Books</h2>

      <BookTable books={bookList} />

      <Genres books={result.data.allBooks} genreHandler={setCurrentGenre}/> 
    </div>
  )
}

export default Books