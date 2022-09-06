import React from 'react'

const Header = ( props ) => <h1>{props.course}</h1>

const Total = ({course} ) => {
  const sum = course.reduce((sum, amount) => sum + amount.exercises, 0)
  return (
  <b>Number of exercises {sum}</b>
  )
}

const Part = ( props ) =>
  <p>
    {props.name} {props.exercises}
  </p>


const Content = ({ parts }) => {
  return (
    parts.map(part =>
      <div key={part.id}>
        <Part name={part.name} exercises={part.exercises}/>
      </div>
    )
  )
}

const Course = ({ courses }) => {
  console.log(courses)
  return (
    courses.map(course =>
    <div key={course.id}>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total  course={course.parts}/>
    </div>
    )
  )
}

export default Course