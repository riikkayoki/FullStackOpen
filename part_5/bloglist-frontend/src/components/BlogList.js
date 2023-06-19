import Togglable from "./Togglable"
import blogService from '../services/blogs'


const BlogList = ({ blogs, setBlogs, handleNotify }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleUpdateLikes = async (event, blog) => {
    event.preventDefault()

    const updatedBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    try {

      const updatedBlog = await blogService.update(blog.id, updatedBlogObject)

      updatedBlog.user = {
        username: blog.user.username,
        name: blog.user.name
      }

      const updatedBlogs = blogs
        .map(b => b.id === updatedBlog.id ? updatedBlog : b)
        .sort((a, b) => b.likes - a.likes)

      setBlogs(updatedBlogs)
      handleNotify(`You liked '${updatedBlog.title}'`, 'notification')
    } catch (exception) {
      handleNotify('unable to like the blog', 'error')
    }


  }

  const handleDeleteBlog = async (event, blog) => {
    event.preventDefault()

    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(updatedBlogs)
        handleNotify(`You deleted '${blog.title}'`, 'notification')
      }
    }
    catch (exception) {
      handleNotify('unable to delete the blog', 'error')
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map(blog =>
          <div key={blog.id}>
            <div style={blogStyle} data-cy="blog">
              <span>{blog.title} {blog.author}</span>
              <Togglable buttonLabel='view'>
                {blog.url} <br />
                {blog.likes} <button onClick={(event) => handleUpdateLikes(event, blog)} data-cy='like'>like</button> <br />
                {blog.user.name} <br />
                <button onClick={(event) => handleDeleteBlog(event, blog)}>delete</button>
              </Togglable>
            </div>
          </div>
        )}
      </div>
    </div>
  )

}

export default BlogList