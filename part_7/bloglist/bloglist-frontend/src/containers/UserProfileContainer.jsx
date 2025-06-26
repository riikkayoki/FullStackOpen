import { styled } from 'styled-components'
import { useParams } from 'react-router-dom'
import { useFetchUserQuery } from '../hooks/useFetchUserQuery'

const StyledName = styled.h2`
    padding: 10px 0;
`

const StyledBlog = styled.li`
    padding: 10px 0;
`

const StyledSubTitle = styled.h3`
    padding: 10px 0;
    margin-top: 5px;
`
export const UserProfileContainer = () => {
    const { id } = useParams()
    const { data: userData, isLoading } = useFetchUserQuery(id)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (!userData) {
        return null
    }

    return (
        <div>
            <StyledName>{userData.username}</StyledName>

            <StyledSubTitle>added blogs</StyledSubTitle>

            {userData.blogs.map((blog) => (
                <div key={blog.id}>
                    <StyledBlog>{blog.title}</StyledBlog>
                </div>
            ))}
        </div>
    )
}
