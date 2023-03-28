import Togglable from "./Togglable"
import blogService from '../services/blogs'


const BlogList = ({blogs, setBlogs, handleNotify }) => {

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
      handleNotify(`unable to like the blog`, 'error')
    }


  }

  return (
    <div>
      <h2>Blogs</h2>
      <div >
        {blogs.map(blog =>
          <div key={blog.id}>
            <div style={blogStyle}>
              {blog.title}
              <Togglable buttonLabel='view'>
              <ul>
              <li><b>Author:</b> {blog.author}</li>
              <li><b>Url: </b>{blog.url}</li>
              <li><b>Likes: </b> {blog.likes} <button onClick={(event) => handleUpdateLikes(event, blog)}>like</button></li>
              <li><b>Added by: </b> {blog.user.name}</li>
              </ul>
              </Togglable>
            </div>
          </div>
        )}
      </div>
    </div>
  )

}

export default BlogList