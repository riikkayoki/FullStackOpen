import { useState } from 'react'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Title = (props) => {
  return (
  <h1>{props.title}</h1>
  )
}

const Anecdote = (props) => {
  return (
    <>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes</p>
    </>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  const copy = { ...points}
  const [best, setMax] = useState(0)

  return (
    <div>
      <Title title='Anecdote of the day'/>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]}/>
      <Button onClick={() => {
        copy[selected] += 1
        setPoints(copy)
        if (copy[selected] > copy[best]) {
          setMax(selected)
        }
      }
      } text='vote'/>
      <Button onClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))} text='next anecdote'/>
      <Title title='Anecdote with most votes'/>
      <Anecdote anecdote={anecdotes[best]} votes={points[best]}/>
    </div>
  )
}

export default App
