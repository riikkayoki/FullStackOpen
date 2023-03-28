import React, { useState } from 'react'
import blogService from '../services/blogs'


const BlogForm = ({blogs, setBlogs, handleNotify}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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
        const blogObject = {
            title: title,
            author: author,
            url: url,
    }

    try {
        const blog = await blogService.create(blogObject)
        setTitle('')
        setAuthor('')
        setUrl('')
        setBlogs(blogs.concat(blog))
        handleNotify(`a new blog '${blogObject.title}' added`, 'notification')
    } catch (exception) {
        console.log('error')
    }
}

    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={handleBlogAdd}>
                <div>
                    title:
                    <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={handleUrlChange}
                    />
                </div>
            <button type="submit">create</button>
            </form>

        </div>

    )
}

export default BlogForm