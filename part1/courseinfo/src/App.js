const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  let parts = props.course.parts;
  return (
    <>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </>
    
  )
}

const Footer = (props) => {
  let parts = props.course;
  let total=0;
  // console.log(total);
  // console.log(props.parts.length);
  for (let i=0; i< parts.length; i++){
    total = total + parts[i].exercises;
    // console.log(total);
  }
  
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}


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
      <Header course={course}/>
      <Content course={course}/>
      <Footer course={course}/>
    </div>
  )
}

export default App