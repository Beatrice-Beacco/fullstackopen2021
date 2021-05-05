import React from 'react'

const Course = ({courses}) => {
    return(courses.map((course) =>{ //takes each element of the array (aka a course)
        
        //Reduce returns the total sum of the propriety 'exercises' of the elements of the array 'parts'
        const totalEs = course.parts.reduce((tot,part)=>{
        return tot + part.exercises},0)
        
        //Renders the course name, the total number of exercies (totalEs) and maps the array in the 
        //propriety 'parts' so that all of its its elements are displayed in a list
        return (
        <div>
            <h1 key={course.id}>{course.name}</h1>
            {course.parts.map((part) =>{
                return(
                <li key={part.id}>
                    {part.name} | Exercises = {part.exercises}
                </li>
                )}
            )}
            <br/>
            Total exercises = {totalEs}
        </div>
    )
    })
    )
}

export default Course