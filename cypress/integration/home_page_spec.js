describe("Log in", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.request("GET", "https://c3c5-resource-catalogue.herokuapp.com/");
  });
  it("Check the dropdown login box has a name option", () => {
    cy.get("[data-cy='login']")
      .find("option")
      .should("have.length.greaterThan", 1);
  });
  const user = "Faith";
  const logInAsUser = (user) => {
    cy.get("[data-cy='login']").get("select").select(`${user}`);
  };

  it("When a user logs in, there should be a greeting text saying Hello, name", () => {
    logInAsUser(user);
    cy.get("[data-cy='login']").contains(`Hello, ${user}`);
  });
  it("The heading ‘My To-Study List’ should appear when a user is logged in", () => {
    logInAsUser(user);
    cy.get("[data-cy='study-list']").get("h2").contains("My To-Study List");
  });
  it("There should be a log out button when a user is logged in", () => {
    logInAsUser(user);
    cy.get("[data-cy='login']")
      .get("[data-cy='logout-button']")
      .contains("Log out");
  });
  it("If you click the log out button, a dropdown will appear again", () => {
    logInAsUser(user);
    cy.get("[data-cy='login']").get("[data-cy='logout-button']").click();
    cy.get("[data-cy='login']")
      .find("option")
      .should("have.length.greaterThan", 1);
  });
});
