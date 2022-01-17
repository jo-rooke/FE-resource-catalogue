describe("Add a resource", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.request("GET", "https://c3c5-resource-catalogue.herokuapp.com/");
  });
  const user = "Faith";
  const logInAsUser = (user) => {
    cy.get("[data-cy='login']").get("select").select(`${user}`);
  };
  it("When a user logs in, there should be a button to add a resource which redirects user to the add resource page", () => {
    logInAsUser(user);
    cy.get("[data-cy='resource-list']")
      .get("button")
      .contains("Add a new resource")
      .click()
      .url()
      .should("match", /\/resources\/add/);
  });
  it("All input fields are present", () => {
    logInAsUser(user);
    cy.get("[data-cy='resource-list']")
      .get("button")
      .contains("Add a new resource")
      .click();
    cy.get("input");
    const fields = ["resource_name", "author_name", "content_type", "url"];
    for (const field of fields) {
      cy.get(`input[name='${field}']`).should("have.value", "");
    }
    cy.get("[data-cy='username']").should("be.disabled");
    cy.get("[data-cy='username']").should(
      "have.attr",
      "placeholder",
      `user name: ${user}`
    );
    cy.get("[data-cy='week-no']").find("option").should("have.length", 10);
    cy.get("select[name='rec_status']").find("option").should("have.length", 4);
    cy.get(`textarea[name='description']`)
      .should("have.attr", "placeholder", "description")
      .should("have.value", "");
    cy.get(`textarea[name='rec_message']`)
      .should("have.attr", "placeholder", "What did you think of the resource?")
      .should("have.value", "");
    cy.get("[data-cy='tags']")
      .find("button")
      .should("have.length.greaterThan", 0);
  });
  it("There should be a submit button", () => {
    logInAsUser(user);
    cy.get("[data-cy='resource-list']")
      .get("button")
      .contains("Add a new resource")
      .click();
    cy.get("button").contains("Submit");
  });
});
