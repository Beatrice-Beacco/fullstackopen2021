import React, { useState } from 'react'

const App = () => {
  
  //Create states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Renders the components
  return (
    <div>
    <center>
      <h1>Give your feedback!</h1>
      <Button text="Good! :)" handler={()=>Increment(good, setGood)}/>
      <Button text="Neutral :|" handler={()=>Increment(neutral, setNeutral)}/>
      <Button text="Bad! :(" handler={()=>Increment(bad, setBad)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      </center>
    </div>
  )
}

//Increments by 1 the state passed as an argument (value) and sets it with its respective function (setValue passed as an argument)
const Increment = (value, setValue) =>{
  let valueCopy = value;
  return(
    setValue(valueCopy +1)
  );
}

//Renders a button with its respective text and event handler
const Button = ({text, handler}) => {
  return(
  <>
    <button onClick={(handler)}>{text}</button>
  </>);
}

//Renders all statistics
const Statistics = ({good, neutral, bad})=>{

  if((good===0 && neutral===0) && bad===0){ //If all states are 0 it means there's no feedback yet
    return (<div>
      <center>
      <br></br>
        No feedback given. Click on any button to give feedback!
      </center>
    </div>);
  } else{

    let total = good + neutral + bad;

    //Calls the components and puts them in a table
    return (
      <div>
        <h1>Statistics:</h1>
        <table>
        <tbody>
        <SingleStatistic text="Good" stat={good}/>
        <SingleStatistic text="Neutral" stat={neutral}/>
        <SingleStatistic text="Bad" stat={bad}/>
        <SingleStatistic text="All" stat={total}/>
        <Average good={good} bad={bad} total={total}/>
        <Positive good={good} total={total}/>
        </tbody>
        </table>
      </div>
    )
  }
}

//Renders the values passed in a table row with 2 columns
let SingleStatistic = ({ text, stat }) => (<><tr><td>{text}:</td><td>{stat}</td></tr></>)

//Calculates the average score and renders it in a table row with 2 columns
let Average = ({ good, bad, total }) => (<><tr><td>Average:</td><td>{((good - bad) / total).toFixed(5)}</td></tr></>)

//Calculates the positive percentage and renders it in a table row with 2 columns
let Positive = ({good, total}) => (<><tr><td>Positive:</td><td>{parseInt((good / total) * 100)}%</td></tr></>)

export default App