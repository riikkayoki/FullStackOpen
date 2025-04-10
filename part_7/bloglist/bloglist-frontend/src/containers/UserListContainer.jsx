import { useFetchAllUsers } from '../hooks/useFetchAllUsers'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Table = styled.table`
    border-spacing: 10px;
`

const TableCell = styled.td`
    padding-right: 20px;
`

const HeaderCell = styled.th`
    text-align: left;
    padding-right: 20px;
`

const UsernameLink = styled(Link)`
    color: blue;
    text-decoration: underline;
`

export const UserListContainer = () => {
    const { data: users } = useFetchAllUsers()

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <HeaderCell></HeaderCell>
                        <HeaderCell>blogs created</HeaderCell>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user) => (
                            <tr key={user.id}>
                                <TableCell>
                                    <UsernameLink to={`/users/${user.id}`}>
                                        {user.username}
                                    </UsernameLink>
                                </TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    )
}
