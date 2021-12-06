import React from 'react'

const Anecdote = ({anecdote}) => (
<div>
    <h2>{anecdote.content}</h2>
    <h3>Author: {anecdote.author}</h3>
    <div>Info: {anecdote.info}</div>
    <div>Votes: {anecdote.votes}</div>
<br></br>
</div>
)


export default Anecdote