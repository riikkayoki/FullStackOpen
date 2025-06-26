import { useMutation, useQueryClient } from 'react-query'
import { createBlogComment } from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

export const useCreateBlogComment = () => {
    const notificationDispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    return useMutation(
        async ({ id, content }) => {
            const newComment = await createBlogComment(id, content)
            console.log(id, 'ID')
            return { id: id, content: newComment }
        },
        {
            onSuccess: ({ id, newComment }) => {
                queryClient.setQueryData(['blog', id], (oldData) => {
                    if (!oldData) return oldData
                    return {
                        ...oldData,
                        comments: [...(oldData.comments || []), newComment],
                    }
                })

                notificationDispatch({
                    type: 'SET_NOTIFICATION',
                    data: `A new comment was added`,
                })
            },
            onError: (error) => {
                notificationDispatch({
                    type: 'SET_NOTIFICATION',
                    data:
                        error?.response?.data?.error || 'Error adding comment',
                })
            },
        }
    )
}
