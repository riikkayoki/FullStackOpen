import { useMutation } from 'react-query';
import { deleteBlog } from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContext';

export const useDeleteBlogQuery = (payload) => {
    const notificationDispatch = useNotificationDispatch()

    return useMutation({
        mutationKey: ['deleteBlog', payload],
        mutationFn: ({payload}) => deleteBlog(payload),
        enabled: !!payload,
        onError: (error) => {
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                data: error.response.data.error,
            });
        },
        onSuccess: () => {
            notificationDispatch({
                type: 'SET_NOTIFICATION',
                data: `Blog was deleted.`,
            });
        },
    })

};
