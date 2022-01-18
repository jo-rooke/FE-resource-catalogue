describe("An individual resource", () => {
  it("A resource is accessible from the home page", () => {
    cy.visit("/");
    cy.contains("Data").click();
    cy.url().should("include", `resources/`);
    cy.url().should("match", /\d*/);
    cy.contains("Link to resource")
      .click()
      .should("not.have.attr", "href", "#undefined");
  });
});
