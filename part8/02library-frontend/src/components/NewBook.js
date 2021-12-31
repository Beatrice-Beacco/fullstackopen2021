import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $publishedNumber: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $publishedNumber,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const publishedNumber = parseInt(published)
    
    createBook({
      variables: { title, author, publishedNumber, genres}
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          Genres: {genres.join(' ')}
        </div>
        <button type='submit'>Create Book</button>
      </form>
    </div>
  )
}

export default NewBook
