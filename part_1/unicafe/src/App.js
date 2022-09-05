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

const Statistics = (props) => {
  return (
    <>
    <Result text='good' result={props.good}/>
    <Result text='neutral' result={props.neutral}/>
    <Result text='bad' result={props.bad}/>
    <Result text='all' result={props.all}/>
    <Result text='average' result={props.average}/>
    <Result text='positive' result={props.positive}/>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = good - bad / all
  const positive = good / all * 100 + ' %'
  return (
    <div>
      <Title title='give feedback'/>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'}/>
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <Title title='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
