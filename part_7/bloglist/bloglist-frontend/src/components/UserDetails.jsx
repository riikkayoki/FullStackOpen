import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(245, 241, 243);
`

const UserWrapper = styled.b`
    display: flex;
    padding-inline-end: 5px;
`

export const UserDetails = ({ user }) => {
    return (
        <Container>
            <UserWrapper>{user.name}</UserWrapper>
            is logged in
        </Container>
    )
}
