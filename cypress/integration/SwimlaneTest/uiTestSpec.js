describe('Test1', function(){
    //Please pass through your own username and password
    const user = '';
    const pass = '';

    
    it('Sign In', function(){
        //simple login
        cy.login(user, pass)
    })

    it('Navigating to users', function(){
        //navigating to the settings for the users
        cy.userNav()
        //For verify user, need to pass through your own name and email
        cy.verifyUser('', '', 2)
    })
    
   
    it('Creating New User', function(){
        //Creating a new user
        cy.login(user, pass)
        cy.userNav()
        //Example create user, can pass through your own information below
        cy.createUser('sctrmay@gmail.com', 'iloveswimlane', '55enter7ky88', 'SwimLane Awesome')
    })

    it('Edit User', function(){
        //editing user
        cy.login(user, pass)
        cy.userNav()
        //Please enter below your expected list number and value to change name 
        cy.editName(2, '')
    })

    it('Delete Latest User', function(){
        cy.login(user, pass)
        cy.userNav()
        cy.verifyUser('SwimLane Awesome', 'sctrmay@gmail.com', 0)
        cy.get(':nth-child(1) > .btn-col > [title="Delete User"] > .icon-trash').click()
        cy.get('.ngx-dialog-footer > .btn-primary').click()
    })
    
})