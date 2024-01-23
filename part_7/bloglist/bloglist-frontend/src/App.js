import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogOut from './components/LogOut'
import UserDetails from './components/UserDetails'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useFetchBlogsQuery } from './hooks/useFetchBlogQuery'
import { useCreateBlogQuery } from './hooks/useCreateBlogQuery'
import { useUpdateBlogQuery } from './hooks/useUpdateBlogQuery'
import { useDeleteBlogQuery } from './hooks/useDeleteBlogQuery'
import { useUserLogInQuery } from './hooks/useUserLogInQuery'


const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { data: blogData } = useFetchBlogsQuery()
  const updateBlogMutation = useUpdateBlogQuery(
  );
  const createBlogMutation = useCreateBlogQuery({
    title: title,
    author: author,
    url: url,
  });
  const deleteBlogMutation = useDeleteBlogQuery();


  const userLogInMutation = useUserLogInQuery({
    username: username,
    password: password,
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userLogInMutation.mutateAsync({
        username: username,
        password: password,
      })

      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log(exception)
      //handleNotify(`wrong username or password`, 'error')
    }
  }

  useEffect(() => {
    if (blogData) {
      setBlogs(blogData)
    }
  }
  , [blogData])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const mutationResult = await createBlogMutation.mutateAsync({
        title: title,
        author: author,
        url: url,
    });
    const loggedUser = window.localStorage.getItem('loggedUser');
    const user = JSON.parse(loggedUser);

    blogs.user = user;
    setTitle('');
    setAuthor('');
    setUrl('');
    setBlogs((prevBlogs) => [mutationResult, ...prevBlogs]);
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

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUserNameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <UserDetails user={user} />
        <LogOut />
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
      </div>
    )
  }
}

export default App
