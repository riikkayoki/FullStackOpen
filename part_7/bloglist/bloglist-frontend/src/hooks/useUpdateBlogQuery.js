// useUpdateBlogQuery.js
import { useMutation } from 'react-query';
import { updateBlog } from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContext';

export const useUpdateBlogQuery = (id, payload) => {
    const notificationDispatch = useNotificationDispatch()

    return useMutation({
        mutationKey: ['UpdateBlog', payload],
        mutationFn: ({id, payload}) => updateBlog(id, payload),
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
                data: `Thanks for like`,
            });
        },
    })
};
