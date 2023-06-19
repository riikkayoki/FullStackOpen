
import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'


const LoginForm = ({ setUser, blogService, handleNotify }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      console.log(`logging in with ${JSON.stringify(user)}`)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleNotify(`wrong username or password`, 'error')
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
            data-cy="usernameInput"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            data-cy="passwordInput"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" data-cy="login">login</button>
      </form>
    </div>
  )

}


export default LoginForm