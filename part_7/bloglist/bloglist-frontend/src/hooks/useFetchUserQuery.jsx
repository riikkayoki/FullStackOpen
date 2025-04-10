import { useQuery } from 'react-query'
import { fetchUser } from '../services/users'

export const useFetchUserQuery = (id) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id),
    })
}
