const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const {noBlog, oneBlog, newBlog, manyBlogs, blogNoLikes} = require('../utils/test_helper')


describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(manyBlogs)
  }),

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
  test('new blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  test('new blog has 0 likes if likes is not defined', async () => {
    await api
      .post('/api/blogs')
      .send(blogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body[response.body.length - 1].likes).toBe(0)
  })

})

afterAll(async () => {
    await mongoose.connection.close()
})