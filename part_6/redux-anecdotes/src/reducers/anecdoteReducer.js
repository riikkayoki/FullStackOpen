import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  {
    content: 'If it hurts, do it more often',
    id: 1,
    votes: 0
  },
  {
    content:   'Adding manpower to a late software project makes it later!',
    id: 2,
    votes: 0
  },
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))


const anecdoteSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: anecdotesAtStart,
    reducers: {
      addVote(state, action) {
        const id = action.payload
        const anecdoteToVote = state.find(anecdote => anecdote.id === id)
        const changedAnecdote = {
          ...anecdoteToVote,
          votes: anecdoteToVote.votes + 1
        }
        return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)

    },
    createAnecdote(state, action) {
        const content = action.payload
        const newAnecdote = {
          content,
          id: generateId(),
          votes: 0
        }
        return [...state, newAnecdote]
      }

   }
   })

export const { addVote, createAnecdote } = anecdoteSlice.actions

export const voteAnecdote = (id) => {
  return async dispatch => {
    dispatch(addVote(id))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    dispatch(createAnecdote(content))
  }
}


export default anecdoteSlice.reducer