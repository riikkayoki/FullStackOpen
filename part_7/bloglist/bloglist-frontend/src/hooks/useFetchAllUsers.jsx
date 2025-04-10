import { useQuery } from 'react-query'
import { fetchUsers } from '../services/users'

export const useFetchAllUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(),
    })
}
