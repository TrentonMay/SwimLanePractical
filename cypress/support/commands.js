// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import "cypress-localstorage-commands"

//simple login command
//need to provide a username and password
Cypress.Commands.add('login', (username, password) => { 
    cy.visit('http://turbine-pov.swimlane.io/login')
    cy.get('input[placeholder="USERNAME"').type(username)
    cy.get('input[placeholder="PASSWORD"').type(password)
    cy.get('ngx-button').children('button').click()
  })

  //navigates the user to settings>users
  Cypress.Commands.add('userNav', () =>{
    cy.get('navigation').get('li').last().click()
    cy.get('settings').get('div').eq(2).get('a').eq(1).click()
  })
  
  //will verify the first user in the list
  //when called, need to pass through a name and an email
  Cypress.Commands.add('verifyUser', (name, email) =>{
    cy.get('users').get('li').get('span').eq(1).get('h3').should('contain', name)
    cy.get('users').get('li').get('span').eq(3).get('a').should('contain', email)
  })

  //usable once you have navigated to settings>users
  //when called need to pass through a email, username, password, and name
  Cypress.Commands.add('createUser', (e, u, p, n) =>{
    cy.get('users').get('button').first().should('contain', 'New User')
    cy.get('users').get('button').first().click()
    cy.get('ngx-drawer').get('new-user').get('form').get('ngx-input').eq(0).should('have.attr', 'label', 'Email').type(e)
    cy.get('ngx-drawer').get('new-user').get('form').get('ngx-input').eq(1).should('have.attr', 'label', 'Username').type(u)
    cy.get('ngx-drawer').get('new-user').get('form').get('ngx-input').eq(2).should('have.attr', 'label', 'Password').type(p)
    cy.get('ngx-drawer').get('new-user').get('form').get('ngx-input').eq(3).should('have.attr', 'label', 'Full Name').type(n)

      cy.get('ngx-drawer').get('new-user').get('button').last().should('contain', 'Create User').click()
  })

  //need to pass which user to edit as listed
  //unfortunately it seems at this time some users are locked out from being edited? 
  //can only edit users that I create 
  //so if you want to edit the second user in the list, enter 2
  //need to also pass the name for the edit 
  Cypress.Commands.add('editName', (n, name ) => {
    cy.get('users').get('i.icon-edit').eq(n).click()
    cy.get('ngx-drawer').get('form').first().get('ngx-input').first().should('have.attr', 'label', 'Name').get('input').first().clear().type(name)
    cy.get('ngx-drawer').get('form').first().children('button').first().should('contain', 'Update Profile').click()
    cy.get('.ngx-dialog-header > .btn').should('contain', 'Ok').click()
    cy.reload()
  })
