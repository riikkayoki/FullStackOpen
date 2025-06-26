import { useQuery } from 'react-query'
import { fetchBlogComments } from '../services/blogs'

export const useFetchBlogComments = (id) => {
    return useQuery({
        queryKey: ['blogComments', id],
        queryFn: () => fetchBlogComments(id),
    })
}
