import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

    if (user === null) {
        return(
        <LoginForm setUser={setUser} />
        )

      } else {
        return (
        <BlogList blogs={blogs}/>
        )
      }

    }

export default App