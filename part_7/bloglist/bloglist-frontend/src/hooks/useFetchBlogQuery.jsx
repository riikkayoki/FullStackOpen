import { useQuery } from 'react-query'
import { fetchBlog } from '../services/blogs'

export const useFetchBlogQuery = (id) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlog(id),
    })
}
