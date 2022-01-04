import React, {useState, useEffect} from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

import Genres from './Genres'

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`

const BOOKS_BY_GENRE = gql`
  query booksByGenre ($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
      }
      published
      genres
    }
  }
`;

const Books = (props) => {

  const result = useQuery(ALL_BOOKS) 
  const [getBooksByGenre, resultBooksByGenre] = useLazyQuery(BOOKS_BY_GENRE);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [bookList, setBookList] = useState([]);

  console.log('Variabile currentGenre: ',currentGenre);
  console.log('Variabile bookList: ',bookList);

  useEffect(() => {
    if(result.data){
      console.log(result.data);
      setBookList(result.data.allBooks)
    }
  }, [result.data]); 

  useEffect(() => {
    console.log(resultBooksByGenre);
    getBooksByGenre({ variables: { genre: currentGenre } });
    if(resultBooksByGenre.data){
    console.log(resultBooksByGenre);
    setBookList(resultBooksByGenre.data.allBooks);
    console.log(bookList);
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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          {bookList.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <Genres books={result.data.allBooks} genreHandler={setCurrentGenre}/> 
    </div>
  )
}

export default Books