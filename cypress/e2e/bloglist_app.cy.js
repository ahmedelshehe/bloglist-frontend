describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'ahmed ayman',
			username: 'testuser',
			password: 'testuser'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})
	it('Login form is shown', function() {
		cy.contains('username')
		cy.contains('password')
		cy.contains('cancel')
	})
	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('testuser')
			cy.get('#password').type('testuser')
			cy.get('#login-button').click()

			cy.contains('ahmed ayman logged in')
		})
		it('fails with wrong credentials', function() {
			cy.get('#username').type('wronguser')
			cy.get('#password').type('wronguser')
			cy.get('#login-button').click()
			cy.contains('username')
			cy.contains('password')
			cy.contains('cancel')
			cy.contains('invalid username or password')
		})
	})
	describe('when user logged in', function () {
		beforeEach(function () {
			cy.get('#username').type('testuser')
			cy.get('#password').type('testuser')
			cy.get('#login-button').click()
			cy.get('#viewToggle').click()
			cy.get('#title').type('testtitle')
			cy.get('#author').type('testauthor')
			cy.get('#url').type('www.example.com')
			cy.get('#create-button').click()
			cy.get('.viewBlog').click()
		})
		it('A blog can be created', function() {
			cy.contains('a new blog testtitle by ahmed ayman is added')
		})
		it('A blog can be liked by the user',function(){
			cy.get('.likeButton').click()
			cy.contains('likes:1')
		})
		it('A blog can deleted by the user',function(){
			cy.get('.removeButton').click()
			cy.should('not.contain', 'testtitle  By  testauthor')
		})
		it('Blogs should be order by likes', function(){
			cy.get('.blog').eq(0).get('.likeButton').click()
			cy.wait(500)
			cy.get('.blog').eq(0).get('.likeButton').click()
			cy.get('#viewToggle').click()
			cy.get('#title').type('testtitle2')
			cy.get('#author').type('testauthor2')
			cy.get('#url').type('www.example2.com')
			cy.get('#create-button').click()
			cy.get('.blog').eq(0).contains('testtitle')
			cy.get('.blog').eq(1).contains('testtitle2')
		})
	})
})