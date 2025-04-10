import { Notification } from '../components/Notification'
import { Routers } from '../Routers'
import { Header } from './Header'
import styled from 'styled-components'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`

const PageTitle = styled.h1`
    padding: 10px 0;
`

export const PageTemplate = ({ user }) => {
    return (
        <PageContainer>
            <Header user={user} />
            <PageTitle>Blog app</PageTitle>
            <Notification />
            <Routers />
        </PageContainer>
    )
}
