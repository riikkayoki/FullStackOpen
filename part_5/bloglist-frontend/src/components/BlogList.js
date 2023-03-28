
import Togglable from "./Togglable"

const BlogList = ({blogs}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
              <li><b>Likes: </b> {blog.likes} <button>like</button></li>
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