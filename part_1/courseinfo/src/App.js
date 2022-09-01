
const Header = (props) => {
  return (
  <h1>
     <p> {props.course} </p>
  </h1>
  )
}

const Content = (props) => {
  return (
      <p>{props.part} {props.exercise}</p>
  )
}
const App = () => {
  const exercise1 = 10
  const exercise2 = 7
  const exercise3 = 14
  return (
    <><Header course='Half Stack application development' />
    <Content part='Fundamentals of React' exercise={exercise1}/>
    <Content part='Using props to pass data' exercise={exercise2}/>
    <Content part='State of a component' exercise={exercise3}/>
    </>
  )
}

export default App