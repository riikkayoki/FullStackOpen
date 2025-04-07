import { login } from '../services/login'
import { useMutation } from 'react-query'
import blogService from '../services/blogs'

export const useUserLogInQuery = ({username, password}) => {
    const payload = {
        username: username,
        password: password,
    }
    return useMutation({
        mutationKey: ['login', payload],
        mutationFn: () => login(payload),
        enabled: !!payload,
        onSuccess: (data) => {
            window.localStorage.setItem('loggedUser', JSON.stringify(data))
            blogService.setToken(data.token)
        },
        onError: (error) => {
            console.log(error)
        },
    })

}