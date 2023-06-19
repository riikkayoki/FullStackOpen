describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testUsername1234!',
      password: 'testPassword1234!'
    }

    cy.request('POST', 'http://localhost:3000/api/users/', user)

    const other_user = {
      name: 'Other User',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', other_user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-cy="usernameInput"]').type('testUsername1234!')
      cy.get('[data-cy="passwordInput"]').type('testPassword1234!')
      cy.get('[data-cy="login"]').click()
      cy.contains('Test User is logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('[data-cy="usernameInput"]').type('testUsername1234!')
      cy.get('[data-cy="passwordInput"]').type('wrongPassword1234!')
      cy.get('[data-cy="login"]').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'testUsername1234!', password: 'testPassword1234!'})
      cy.get('[data-cy="usernameInput"]').type('testUsername1234!')
      cy.get('[data-cy="passwordInput"]').type('testPassword1234!')
      cy.get('[data-cy="login"]').click()
      cy.contains('Test User is logged in')

      cy.createBlog({
        title: 'Hello World',
        author: 'riikkayoki',
        url: 'wwww.helloworld.com',
      })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'World',
        author: 'riikkayoki',
        url: 'wwww.world.com',
      })
      cy.contains('World')
    })
    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1 like')
    })
    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('You deleted \'Hello World\'')
    })
    it('blog can be deleted only by the user who created it', function() {
      // button is shown but other users are unable to delete the blog
      cy.contains('log out').click()
      cy.login({username: 'test', password: 'test'})
      cy.get('[data-cy="usernameInput"]').type('test')
      cy.get('[data-cy="passwordInput"]').type('test')
      cy.get('[data-cy="login"]').click()
      cy.contains('Other User is logged in')
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('unable to delete the blog')
      cy.contains('Hello World')
    })
    it('blogs are ordered according to likes', function() {
      cy.createBlog({
        title: 'World',
        author: 'riikkayoki',
        url: 'wwww.world.com',
      })

      cy.get('[data-cy="blog"]').then(blogs => {
        cy.wrap(blogs[0]).contains('view').click()
        cy.wrap(blogs[1]).contains('view').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[0]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
        cy.wrap(blogs[1]).contains('like').click()
    })

    cy.get('[data-cy="blog"]').eq(0).should('contain', 'World')
    cy.get('[data-cy="blog"]').eq(1).should('contain', 'Hello World')


  })
  })
})

