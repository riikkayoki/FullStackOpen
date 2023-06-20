import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
    }

    return (
        <div>
            <h2>add new anecdote</h2>
            <form onSubmit={handleAddAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </div>
    )
}


export default AnecdoteForm
