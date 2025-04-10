import { UserDetails } from '../components/UserDetails'
import { LogOut } from '../components/LogOut'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LogOutWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    gap: 10px;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    background-color: rgb(222, 70, 154);
    border-radius: 8px;
    border: none;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid rgb(250, 250, 250);
    background-color: rgb(222, 70, 154);

    &:hover {
        background-color: rgb(143, 9, 96);
        color: white;
    }
    &:active {
        background-color: rgb(86, 7, 55);
        color: white;
    }
    &:focus {
        outline: none;
    }
    text-transform: uppercase;
    font-weight: bold;
`

export const Header = ({ user }) => {
    return (
        <Container>
            <StyledLink to="/">home</StyledLink>
            <StyledLink to="/users">users</StyledLink>
            <LogOutWrapper>
                <UserDetails user={user} />

                <LogOut />
            </LogOutWrapper>
        </Container>
    )
}
