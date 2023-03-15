const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

const Blog = require('../models/blog')
const {noBlog, oneBlog, manyBlogs} = require('../utils/test_helper')


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
  test('idd is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})


afterAll(async () => {
    await mongoose.connection.close()
})