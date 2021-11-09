import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
 
test('renders content', () => {
   const blog = {
    title: 'Testblog',
    author: 'Tester',
    url: 'testblog.net',
    likes: 1,
    users: [{id: "61633ebc7eee58450b2983c6",
    name: "Bea",
    username: "Beuccia"}]
   }
 
   const component = render(
       <Blog blog={blog} />
   )
 
   expect(component.container).toHaveTextContent(
    'Testblog'
  )
   expect(component.container).toHaveTextContent(
    'Tester'
  )
  expect(component.container).not.toHaveTextContent(
    1
  )
  expect(component.container).not.toHaveTextContent(
    'testblog.net'
  )
})

test('renders on click', () => {
  const blog = {
   title: 'Testblog',
   author: 'Tester',
   url: 'testblog.net',
   likes: 1,
   users: [{id: "61633ebc7eee58450b2983c6",
   name: "Bea",
   username: "Beuccia"}]
  }

  const username = {
    name: 'Tester',
    username: 'Tester'
   }

  const component = render(
      <Blog blog={blog} user={username} />
  )

  const button = component.getByText('Show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'testblog.net'
  )
   expect(component.container).toHaveTextContent(
    1
  )
  
})
