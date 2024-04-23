/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

    it('login with correct credentials', () => {
      cy.get('input[name="email"]').type('student@student.utwente.nl')
        cy.get('input[name="password"]').type('Password123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
    })
})
