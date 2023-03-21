
import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'


const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
    try {
        const user = await loginService.login({
            username, password
        })
        console.log(`logging in with ${JSON.stringify(user)}`)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
        console.log('wrong credentials')
    }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )

}


export default LoginForm