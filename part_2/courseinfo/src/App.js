const Header = ({ course }) => <h1>{course}</h1>

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

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total  course={course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App