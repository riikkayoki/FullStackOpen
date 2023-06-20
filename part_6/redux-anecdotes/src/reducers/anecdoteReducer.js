import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addVote(state, action) {
        const id = action.payload.id
        const anecdoteToChange = action.payload
        return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteToChange)

    },
    createAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }

   }
   })

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
    const vote = await anecdoteService.voteAnecdote(anecdoteToChange)
    dispatch(addVote(vote))

  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.newAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}



export default anecdoteSlice.reducer