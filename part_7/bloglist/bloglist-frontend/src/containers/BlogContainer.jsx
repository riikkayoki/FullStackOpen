import { useFetchBlogQuery } from '../hooks/useFetchBlogQuery'
import { useParams } from 'react-router-dom'
import { ContentTemplate } from './ContentTemplate'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import styled from 'styled-components'
import { useUpdateBlogQuery } from '../hooks/useUpdateBlogQuery'
import { useEffect, useState } from 'react'
import { useCreateBlogComment } from '../hooks/useCreateBlogComment'
import { useFetchBlogComments } from '../hooks/useFetchBlogComments'
const CommentInputWrapper = styled.form`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
`

const StyledInput = styled.input`
    padding: 5px;
    border-radius: 8px;
    border: 1px solid rgb(190, 77, 139);
    box-sizing: border-box;
    margin-right: 10px;
    width: 350px;
`

export const BlogContainer = () => {
    const { id } = useParams()
    const { data: blogData } = useFetchBlogQuery(id)
    const { data: blogComments } = useFetchBlogComments(id)

    const updateBlogMutation = useUpdateBlogQuery()
    const [likes, setLikes] = useState(blogData?.likes || 0)
    const [commentContent, setCommentContent] = useState('')
    const [comments, setComments] = useState(blogComments || [])

    const createCommentMutation = useCreateBlogComment()

    useEffect(() => {
        if (blogData) {
            setLikes(blogData.likes)
        }

        if (comments.length === 0 && blogComments) {
            setComments(blogComments)
        }
    }, [blogData, blogComments, comments])

    const handleUpdateLikes = async (event, blog) => {
        event.preventDefault()

        const updatedBlogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        setLikes((prev) => prev + 1)

        try {
            await updateBlogMutation.mutateAsync({
                id: blog.id,
                payload: updatedBlogObject,
            })
        } catch (err) {
            console.error('Error updating blog:', err)
            setLikes((prev) => prev - 1)
        }
    }

    const handleCommentSubmit = async (event) => {
        event.preventDefault()
        if (!commentContent.trim()) return
        try {
            await createCommentMutation.mutateAsync({
                id,
                content: commentContent,
            })
            setCommentContent('')
            setComments((prev) => [
                ...prev,
                { content: commentContent, id: Date.now() },
            ])
        } catch (err) {
            console.error('Failed to submit comment:', err)
        }
    }

    if (!blogData) return <div>Loading...</div>

    return (
        <ContentTemplate title={blogData.title}>
            <div>
                <p>{blogData.content}</p>
                <p>Author: {blogData.author}</p>
                <a href={blogData.url}>
                    {blogData.url}
                </a>
                <p>Likes: {likes}</p>
                <Button
                    onClick={(event) => handleUpdateLikes(event, blogData)}
                    data-cy="like"
                    text="like"
                />
                <p>Added by: {blogData.user.username}</p>
            </div>

            <h3>Comments</h3>
            <ul>
                {comments?.map((comment) => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>

            <CommentInputWrapper onSubmit={handleCommentSubmit}>
                <StyledInput
                    type="text"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Add a comment"
                />
                <Button
                    data-cy="add-comment"
                    type="submit"
                    text="Add"
                    onClick={handleCommentSubmit}
                />
            </CommentInputWrapper>
        </ContentTemplate>
    )
}
