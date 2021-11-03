import React from 'react'


const Header = (props) => {
    return <h2>{props.course.name}</h2>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercise}
      </p>
    );
  };
  
  const Content = (props) => {
    let parts = props.course.parts
    return (
      <div>
        {parts.map((part, i) => (
          <Part key={i} part={part.name} exercise={part.exercises} />
        ))}
      </div>
    );
  };
  
  const Total = (props) => {
    const { course } = props
    const { parts } = course
    let total = parts.reduce((sum, part) => (sum + part.exercises), 0)
    return <b>total of {total} exercises</b>
  };
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course}/>
        <Total course={props.course} />
      </div>
    )
  }

export default Course