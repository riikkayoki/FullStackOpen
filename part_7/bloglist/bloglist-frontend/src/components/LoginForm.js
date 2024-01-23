import React from 'react'

const LoginForm = ({ username, password, handleLogin, handlePasswordChange, handleUserNameChange }) => {

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
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-cy="passwordInput"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" data-cy="login">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
