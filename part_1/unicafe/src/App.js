import { useState } from 'react'

const Title = (props) => {
  return (
  <h1>{props.title}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Result = (props) => {
  return (
    <p>{props.text} {props.result}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = all / 3 + ' %'
  return (
    <div>
      <Title title='give feedback'/>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <Title title='statistics'/>
      <Result text='good' result={good}/>
      <Result text='neutral' result={neutral}/>
      <Result text='bad' result={bad}/>
      <Result text='all' result={all}/>
      <Result text='average' result={average}/>
    </div>
  )
}

export default App
