describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = { name: 'Test', username: 'Test', password: 'Test' }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Test')
      cy.get('#password').type('Test')
      cy.get('#login-button').click()
      cy.contains('Logged in as')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
    cy.contains('login').click()
    cy.get('#username').type('Test')
    cy.get('#password').type('Test')
    cy.get('#login-button').click()
    cy.contains('Logged in as')
    })

    it('A blog can be created', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('Testblog')
      cy.get('#author').type('Test')
      cy.get('#url').type('Test')
      cy.contains('Submit').click()
      cy.contains('Testblog')
    })
  })


})