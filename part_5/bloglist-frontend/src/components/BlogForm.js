import React, { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'


const BlogForm = ({ blogs, setBlogs, handleNotify }) => {

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

  const blogFormRef = useRef()

  const handleBlogAdd = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      const loggedUser = window.localStorage.getItem('loggedUser')
      const user = JSON.parse(loggedUser)
      blog.user = user
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
      handleNotify(`a new blog '${blogObject.title}' added`, 'notification')
    } catch (exception) {
      handleNotify(`unable to add '${blogObject.title}'`, 'error')

    }
  }


  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={handleBlogAdd}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              id='title-input'
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              id='author-input'
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              id='url-input'
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>

  )
}

export default BlogForm