import React from 'react'
import { Button } from './Button'

const LoginForm = ({
    username,
    password,
    handleLogin,
    handlePasswordChange,
    handleUserNameChange,
}) => {
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
                <Button
                    type="submit"
                    data-cy="login"
                    onClick={handleLogin}
                    text="login"
                />
            </form>
        </div>
    )
}

export default LoginForm
