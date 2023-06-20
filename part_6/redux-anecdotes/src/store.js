import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { createAnecdote } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})


anecdoteService.getAll().then(anecdotes =>
    anecdotes.forEach(anecdote => {
        store.dispatch(createAnecdote(anecdote))
    })
)


export default store