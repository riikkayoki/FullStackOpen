import { Togglable } from './Togglable'
import { Button } from './Button'
import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Container = styled.div`
    padding: 10px 0;
`

const BlogWrapper = styled.div`
    padding: 0 0 5px 10px;
    border: 1px solid rgb(190, 77, 139);
    border-radius: 8px;
    gap: 10px;
    margin-bottom: 10px;
    background-color: rgb(252, 228, 249);
    flex-direction: row;
`

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 5px;
    gap: 10px;
`

const BlogLink = styled(Link)`
    text-transform: uppercase;
`

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 0;
`

const StyledText = styled.b`
    padding-inline-end: 5px;
    color: rgb(190, 77, 139);
    padding-bottom: 5px;
`

export const BlogList = ({ blogs, handleDeleteBlog, handleUpdateLikes }) => {
    const [visible, setVisible] = useState(false)

    const toggleVisilibility = () => {
        setVisible(!visible)
    }
    const buttonLabel = visible ? 'hide blog details' : 'view details'

    return (
        <Container>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <BlogWrapper data-cy="blog">
                        <DetailsWrapper>
                            <BlogLink
                                to={`/blogs/${blog.id}`}
                                style={{
                                    color: 'rgb(15, 12, 13)',
                                    fontWeight: 'bold',
                                }}
                            >
                                {blog.title} {blog.author}
                            </BlogLink>

                            <Togglable
                                buttonLabel={buttonLabel}
                                visible={visible}
                                onClick={toggleVisilibility}
                            >
                                <RowContainer>
                                    <StyledText>Url:</StyledText>
                                    {blog.url}
                                </RowContainer>
                                <RowContainer>
                                    <StyledText>Likes:</StyledText>
                                    {blog.likes}
                                </RowContainer>
                                <RowContainer>
                                    <StyledText>Added by:</StyledText>
                                    {blog.user.username}
                                </RowContainer>
                                <RowContainer>
                                    <Button
                                        onClick={(event) =>
                                            handleUpdateLikes(event, blog)
                                        }
                                        data-cy="like"
                                        text="like"
                                    />
                                    <Button
                                        onClick={(event) =>
                                            handleDeleteBlog(event, blog)
                                        }
                                        text="delete"
                                    />
                                </RowContainer>
                                <Button
                                    onClick={toggleVisilibility}
                                    text={buttonLabel}
                                />
                            </Togglable>
                        </DetailsWrapper>
                    </BlogWrapper>
                </div>
            ))}
        </Container>
    )
}
