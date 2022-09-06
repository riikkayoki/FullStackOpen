import React from 'react'
import Course from "./Course"

const App = ({courses}) => {
  return (
    <div>
      <Course courses={courses}/>
    </div>
  )
}

export default App