// test: /Users/riikkasalojoki/Repositories/FullStackOpen/part_5/bloglist-frontend/src/components/BlogForm.js

//  The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.

//  The test should fill the form with a new blog, submit it and verify that the mock handler function passed in the component's props is called with the right details.

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm', () => {
  test('form calls event handler with right details when new blog is created', () => {
    const mockSetBlogs = jest.fn()
    const mockHandleNotify = jest.fn()
    const blogs = {
      title: 'test title',
      author: 'test author',
      url: 'test url',
      likes: 1,
      user: {
        username: 'testuser',
        name: 'test name',
      },
    }

    render(
      <BlogForm
        blogs={blogs}
        setBlogs={mockSetBlogs}
        handleNotify={mockHandleNotify}
      />
    )

    expect(screen.getByText('Create a new blog')).toBeDefined()
    const title = screen.getByText('title:')
    userEvent.type(title, 'test title 2')
    const author = screen.getByText('author:')
    userEvent.type(author, 'test author 2')
    const url = screen.getByText('url:')
    userEvent.type(url, 'test url 2')

    const button = screen.getByText('create')
    button.click()

    mockSetBlogs.mock.calls.forEach((call) => {
      expect(call[0].title).toBe('test title 2')
      expect(call[0].author).toBe('test author 2')
      expect(call[0].url).toBe('test url 2')
    })
  })
})
