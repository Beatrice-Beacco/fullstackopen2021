import React, { useState } from 'react'

const App = () => {

//Define Anecdotes
  const [selected, setSelected] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Just adding this to see if it works dynamically'
  ]

// Define Votes
  let allVotes = new Array(anecdotes.length).fill(0); //creates an array with the same length as the anecdotes array and fills it with 0s

  const [votes, setVotes] = useState(allVotes)

//Renders the component and sets the functions as event handlers for the buttons
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br /><br />
      <button onClick={() => RandomSelect(setSelected, anecdotes.length)}>New Anecdote!</button> 
      <button onClick={() => Voting(votes, setVotes, selected)}>Vote!</button><br/>
      <br />
      This anecdote has {votes[selected]} votes.
      <MostVoted arrayVotes={votes} arrayStrings={anecdotes} />
    </div>
  )
}

//Creates a random number in range 0 to (anecdotes.length-1) and sets it as the selected state
const RandomSelect = (setValue, max) =>{
  let random = parseInt(Math.random()*max);
  return(
    setValue(random)
  );
}

//Copies the array, increments by 1 the element in the same index as the state, and sets the state of vote
const Voting = (value, setValue, index)=>{
  let copy = {...value};
  copy[index] += 1;
  return(
    setValue(copy)
  );
}

//Renders the anecdote and the vote at index of the highest rated item
const MostVoted = ({arrayVotes, arrayStrings}) =>{

  let index = findMax(arrayVotes, arrayStrings.length); //the index is the return value of the custom function findMax, which returns the index of the highest value item

  return(<div>
    <br /><br />
    <h1>Most voted</h1>
    {arrayStrings[index]}<br/><br/>
    Has {arrayVotes[index]} votes.
  </div>
  );
}

//Returns the index of the highest value
function findMax(array, arrayLength) {
  let max = 0;
  let indexMax = 0;

  for (let i = 0; i < arrayLength; i++) { 
    if (array[i] > max) {
      max = array[i]
      indexMax = i;
    }
  }
  return indexMax
}

export default App