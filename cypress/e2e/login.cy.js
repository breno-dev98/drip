describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.get('#email').type('testeautomatizado@email.com')
    cy.get("#senha").type('testecomcypress')
    cy.get("#submit").click()
  })
})