const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')
const Comment = require('../models/comment')
const comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id).populate('user', {
            username: 1,
            name: 1,
        })

        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        console.error(error)
        response.status(400).json({ error: 'malformatted id' })
    }
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)
    const user = request.user

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'unauthorized' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    })
    response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const { content } = request.body
    const blogId = request.params.id

    const comment = new Comment({
        content,
        blog: blogId,
    })

    const savedComment = await comment.save()

    response.status(201).json(savedComment)
})

blogsRouter.get('/:id/comments', async (req, res) => {
    const comments = await Comment.find({ blog: req.params.id })
    res.json(comments)
})

module.exports = blogsRouter
