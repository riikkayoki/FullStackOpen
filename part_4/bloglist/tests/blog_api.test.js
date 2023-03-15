const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')


describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.manyBlogs)
  }),

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.manyBlogs.length)

  })
  test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
  test('new blog can be added', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.manyBlogs.length + 1)


  })
  test('new blog has 0 likes if likes is not defined', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.manyBlogs.length + 1)
    })

  test('if new blog has no url, returns 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogNoUrl)
      .expect(400)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.manyBlogs.length)
  })
  test('if new blog has no title, returns 400', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogNoTitle)
      .expect(400)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.manyBlogs.length)
  })
  test('a specific blog can be deleted', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.manyBlogs.length - 1)
})
})

afterAll(async () => {
    await mongoose.connection.close()
})