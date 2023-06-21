import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogList from './BlogList'

describe('BlogList', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    const mockSetBlogs = jest.fn()
    const mockHandleNotify = jest.fn()

    const blog = [
      {
        title: 'Test Blog 1',
        author: 'Test Author 1',
        url: 'http://testurl1.com',
        likes: 1,
        user: {
          username: 'testuser1',
          name: 'Test User 1',
        },
      },
    ]

    render(
      <BlogList
        blogs={blog}
        setBlogs={mockSetBlogs}
        handleNotify={mockHandleNotify}
      />
    )
  })

  test('renders title and author but not url and likes', () => {
    expect(screen.findByText(/Test Blog 1/)).toBeDefined()
    expect(screen.findByText(/Test Author 1/)).toBeDefined()
    expect(screen.queryByText('http://testurl1.com')).toBeNull()
    expect(screen.queryByText('1')).toBeNull()
  })

  test('renders also url, likes, user when button is clicked', () => {
    const button = screen.getByText('view')
    button.click()

    expect(screen.findByText('http://testurl1.com')).toBeDefined()
    expect(screen.findByText('1')).toBeDefined()
    expect(screen.findByText('Test User 1')).toBeDefined()
  })

  test('like button is clicked twice', () => {
    const button = screen.getByText('view')
    button.click()

    const likeButton = screen.getByText('like')
    likeButton.click()
    likeButton.click()

    expect(screen.findByText('3')).toBeDefined()
  })
})
