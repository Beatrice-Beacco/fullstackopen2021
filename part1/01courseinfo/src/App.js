import React from 'react'

const App = () => {
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header name={course}/>
      <Content part={course}/>
      <Total part={course}/>
    </div>
  )
}

const Header = (props) =>{
  return(<>
    <p><center>
      <h2>{props.name.name}</h2>
    </center>
    </p>

  </>)
}

const Part = (props) =>{
  return(<>
    <p><center>
      <b>Part {props.num}:</b> {props.pt.name} - {props.pt.exercises} exercises
    </center>
    </p>
  </>)
}



const Content = (props) =>{
  return(
    <>
      <Part num="1" pt={props.part.parts[0]}/>
      <Part num="2" pt={props.part.parts[1]}/>
      <Part num="3" pt={props.part.parts[2]}/>
    </>
    );

}

const Total = (props) =>{
  return(
    <>
    <center>
        <br />For a total of {props.part.parts[0].exercises + props.part.parts[1].exercises + props.part.parts[2].exercises} exercises
    </center>
    </>
  )
} 

export default App


