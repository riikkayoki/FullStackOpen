
const BlogList = ({blogs}) => {

  console.log(blogs)
  

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {blogs.map(blog =>
          <div key={blog.id}>
            <div>
              {blog.title} {blog.author}
            </div>
          </div>
        )}
      </div>
    </div>
  )

}


export default BlogList