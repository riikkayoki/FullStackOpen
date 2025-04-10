import { BlogForm } from '../components/BlogForm'
import { BlogList } from '../components/BlogList'
import { useFetchBlogsQuery } from '../hooks/useFetchBlogsQuery'
import { useCreateBlogQuery } from '../hooks/useCreateBlogQuery'
import { useUpdateBlogQuery } from '../hooks/useUpdateBlogQuery'
import { useDeleteBlogQuery } from '../hooks/useDeleteBlogQuery'
import { useEffect, useRef, useState } from 'react'

export const AllBlogsContainer = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [blogs, setBlogs] = useState([])

    const { data: blogData } = useFetchBlogsQuery()

    useEffect(() => {
        if (blogData) {
            setBlogs(blogData)
        }
    }, [blogData])

    const blogFormRef = useRef()
    const updateBlogMutation = useUpdateBlogQuery()
    const createBlogMutation = useCreateBlogQuery({
        title: title,
        author: author,
        url: url,
    })
    const deleteBlogMutation = useDeleteBlogQuery()

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleBlogAdd = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const mutationResult = await createBlogMutation.mutateAsync({
            title: title,
            author: author,
            url: url,
        })
        const loggedUser = window.localStorage.getItem('loggedUser')
        const user = JSON.parse(loggedUser)

        blogs.user = user
        setTitle('')
        setAuthor('')
        setUrl('')
        setBlogs((prevBlogs) => [mutationResult, ...prevBlogs])
    }

    const handleUpdateLikes = async (event, blog) => {
        event.preventDefault()

        const updatedBlogObject = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        const updatedBlog = await updateBlogMutation.mutateAsync({
            id: blog.id,
            payload: updatedBlogObject,
        })

        blog.user = {
            username: blog.user.username,
            name: blog.user.name,
        }

        const updatedBlogs = blogs
            .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            .sort((a, b) => b.likes - a.likes)

        setBlogs(updatedBlogs)
    }
    const handleDeleteBlog = async (event, blog) => {
        event.preventDefault()

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await deleteBlogMutation.mutateAsync({
                payload: blog.id,
            })
            const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
            setBlogs(updatedBlogs)
        }
    }

    return (
        <>
            <BlogForm
                title={title}
                author={author}
                url={url}
                handleBlogAdd={handleBlogAdd}
                handleTitleChange={handleTitleChange}
                handleAuthorChange={handleAuthorChange}
                handleUrlChange={handleUrlChange}
                blogFormRef={blogFormRef}
            />
            <BlogList
                blogs={blogs}
                handleDeleteBlog={handleDeleteBlog}
                handleUpdateLikes={handleUpdateLikes}
            />
        </>
    )
}
