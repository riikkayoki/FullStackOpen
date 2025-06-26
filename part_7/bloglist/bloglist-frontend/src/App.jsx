import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import { useUserLogInQuery } from './hooks/useUserLoginQuery'
import { PageTemplate } from './containers/PageTemplate'
import './styles/global.css'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const userLogInMutation = useUserLogInQuery({
        username: username,
        password: password,
    })

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await userLogInMutation.mutateAsync({
                username: username,
                password: password,
            })

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            handleNotify(`wrong username or password`, 'error')
        }
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    if (user === null) {
        return (
            <div>
                <LoginForm
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    handleUserNameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                />
            </div>
        )
    } else {
        return <PageTemplate user={user} />
    }
}

export default App
