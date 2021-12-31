  
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import BirthForm from './BirthForm'

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
		born
    bookCount
  }
}
`

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

    if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Born
            </th>
            <th>
              Books
            </th>
          </tr>
          {result.data.allAuthors.map(author =>
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthForm/>
    </div>
  )
}

export default Authors
