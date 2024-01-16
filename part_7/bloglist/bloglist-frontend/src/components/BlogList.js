import Togglable from './Togglable'


const BlogList = ({ blogs, handleDeleteBlog, handleUpdateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <div style={blogStyle} data-cy="blog">
              <span>
                {blog.title} {blog.author}
              </span>
              <Togglable buttonLabel="view">
                {blog.url} <br />
                {blog.likes}{' '}
                <button
                  onClick={(event) => handleUpdateLikes(event, blog)}
                  data-cy="like"
                >
                  like
                </button>{' '}
                <br />
                {blog.user.name} <br />
                <button onClick={(event) => handleDeleteBlog(event, blog)}>
                  delete
                </button>
              </Togglable>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList
