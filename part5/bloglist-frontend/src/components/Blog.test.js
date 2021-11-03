import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
