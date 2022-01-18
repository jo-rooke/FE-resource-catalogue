describe("Filtering options", () => {
  it("A user can filter resources by selecting tag buttons and entering a search term", () => {
    cy.visit("/");
    cy.request("GET", "https://c3c5-resource-catalogue.herokuapp.com/");
    cy.get("[data-cy='filtering-tags']")
      .find("button")
      .should("have.length", 10);

    cy.get("[data-cy='filtering-tags']").contains("HTML").click();

    let htmlButtonCount = 0;
    cy.get("[data-cy='resource-list']")
      .find("[data-cy='resource-item']")
      .find('[name*="HTML"]')
      .each(() => {
        htmlButtonCount++;
      })
      .then(() => {
        cy.get("[data-cy='resource-list']")
          .find("[data-cy='resource-item']")
          .should("have.length", htmlButtonCount);
      });

    cy.get("input")
      .should("exist")
      .type("tutorial")
      .should("have.value", "tutorial");

    cy.get("[data-cy='resource-header']").first().click();
    cy.get("[data-cy='individual-resource']").should("contain", "tutorial");
  });
});
