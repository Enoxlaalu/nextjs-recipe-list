describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/")
  })
  it("has all elements on the page", () => {
    cy.visit("/")
    cy.get("#searchInput").should("exist")
    cy.get('[data-testid="mainHeader"]').should("exist")

    const grid = cy.get('[data-testid="recipesGrid"]')
    grid.get("li").should("have.length", 20)
  })
  it("is lazy loading", () => {
    cy.visit("/")
    const grid = cy.get('[data-testid="recipesGrid"]')
    grid.scrollTo("bottom")
    grid.get("li").should("have.length", 40)
  })
  it("is applying search correctly", () => {
    cy.visit("/")
    cy.get("#searchInput").type("mushroom")
    cy.wait(3000)
    const grid = cy.get('[data-testid="recipesGrid"]')
    grid.get("li h2").contains("mushroom", { matchCase: false })
  })
})
