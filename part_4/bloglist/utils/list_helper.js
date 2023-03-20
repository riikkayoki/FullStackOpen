
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')

  const author_with_most_blogs = _.findKey(authors, (value, key) => {
    return value === _.max(_.values(authors))
  })

  const number_of_blogs = _.find(authors, (value, key) => {
    return value === _.max(_.values(authors))
  })

  return {author: author_with_most_blogs, blogs: number_of_blogs}
}

module.exports = {
    dummy,
    totalLikes,
    mostBlogs
  }