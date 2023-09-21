describe("Basic Functionality", () => {
  it("Website doesn't crash", () => {
    cy.visit("http://localhost:3000");
  });
});
