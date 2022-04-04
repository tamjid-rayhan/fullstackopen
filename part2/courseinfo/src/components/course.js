import React from "react"

const Header = ({ course }) => {
    // console.log('name', course.name);
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ course }) => {
    // console.log('parts', course.parts);
    return (<>
      {course.parts.map((part)=> <Part key={part.id} part={part}/>)}
    </>  
    )
  }
  
  const Course = ({course}) => {
    // console.log('course', course);
    return (<div>
      <Header course={course}/>
      <Content course={course}/>
      <Total sum={course.parts.reduce((s,part)=> part.exercises + s, 0)}/>
    </div>
      
    )
  }

  export default Course