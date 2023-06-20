

import { useMutation, useQueryClient} from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'


const AnecdoteForm = () => {

  const getRandomId = () => (100000 * Math.random()).toFixed(0)
  const dispatch = useNotificationDispatch()


  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({type: 'SET_NOTIFICATION', data: 'Anecdote created'})
    },
    onError: () => {
      dispatch({type: 'SET_NOTIFICATION', data: 'Unable to insert anecdote, check that it is more than 5 characters long'})
    }

  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getRandomId(), votes: 0})
}


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
