describe("Log in", () => {
  it("A user can log in, log out and log in as someone else.", () => {
    cy.visit("/");
    cy.request("GET", "https://c3c5-resource-catalogue.herokuapp.com/");
    const users = ["Veta", "Jo"];
    for (const user of users) {
      cy.get("[data-cy='login']").get("select").select(`${user}`);
      cy.contains(`Hello, ${user}`);
      cy.get("button").contains("Log out").click();
    }
  });
});
