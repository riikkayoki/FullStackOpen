import { memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AllBlogsContainer } from './containers/AllBlogsContainer'
import { UserListContainer } from './containers/UserListContainer'
import { BlogContainer } from './containers/BlogContainer'
import { UserProfileContainer } from './containers/UserProfileContainer'

export const Routers = memo(() => {
    return (
        <Routes>
            <Route path="/" element={<AllBlogsContainer />} />
            <Route path="/users" element={<UserListContainer />} />
            <Route path="/users/:id" element={<UserProfileContainer />} />
            <Route path="/blogs/:id" element={<BlogContainer />} />
        </Routes>
    )
})
