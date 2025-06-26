import { Button } from './Button'
import styled from 'styled-components'

const StyledButton = styled(Button)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: rgb(221, 233, 220);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: rgb(120, 190, 77);
        color: white;
    }
    &:active {
        background-color: rgb(83, 77, 190);
        color: white;
    }
    &:focus {
        outline: none;
    }
    font-size: 14px;
`

export const LogOut = () => {
    const handleLogOut = () => {
        window.localStorage.removeItem('loggedUser')
        window.location.reload()
    }

    return (
        <div>
            <StyledButton onClick={handleLogOut} text={'log out'} />
        </div>
    )
}
