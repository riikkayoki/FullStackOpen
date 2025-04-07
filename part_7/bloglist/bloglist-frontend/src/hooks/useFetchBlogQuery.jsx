import { useQuery } from 'react-query';
import { fetchBlogs } from '../services/blogs';

export const useFetchBlogsQuery = (id) => {
    return useQuery({
        queryKey: ['blogs', id],
        queryFn: () => fetchBlogs(id),
    })
}