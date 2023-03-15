const listHelper = require('../utils/list_helper')
const {noBlog, oneBlog, manyBlogs} = require('./test_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(noBlog)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('totalLikes returns 0 when there are no blogs', () => {
    const result = listHelper.totalLikes(noBlog)
    expect(result).toBe(0)
  }),
  test('totalLikes returns the number of likes of a single blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(7)
  }),
  test('totalLikes returns the number of likes of many blogs', () => {
    const result = listHelper.totalLikes(manyBlogs)
    expect(result).toBe(36)
  })
})