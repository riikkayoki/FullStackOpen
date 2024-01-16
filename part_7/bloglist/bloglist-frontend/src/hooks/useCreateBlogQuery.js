// useCreateBlogQuery.js
import { useMutation } from 'react-query';
import { createBlog } from '../services/blogs';
import { useNotificationDispatch } from '../NotificationContext';

export const useCreateBlogQuery = ({ title, author, url }) => {

    const notificationDispatch = useNotificationDispatch()

    const payload = {
        title: title,
        author: author,
        url: url,
    }
    return useMutation({
        mutationKey: ['createBlog', payload],
        mutationFn: () => createBlog(payload),
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
                data: `a new blog ${title} by ${author} added`,
            });
        },
    })
};
