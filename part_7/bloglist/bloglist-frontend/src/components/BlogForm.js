
import Togglable from './Togglable'


const BlogForm = ({
  handleBlogAdd,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  blogFormRef,
  title,
  author,
  url }) => {

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
              id="title-input"
              data-cy="titleInput"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              id="author-input"
              data-cy="authorInput"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              id="url-input"
              data-cy="urlInput"
              onChange={handleUrlChange}
            />
          </div>
          <button type="submit" data-cy="create">
            create
          </button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
