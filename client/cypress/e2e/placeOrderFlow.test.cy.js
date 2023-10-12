/* global cy */

describe("Place Order Flow", () => {
  it("should simulate a user going through the steps to place an order", () => {
    cy.visit("/collections/all/tutorials");
    cy.contains("button", "Shop").click();
    cy.get(".product").contains("Batman Decals").click();
    cy.get(".product").contains("Double Chevron Decals - 11").click();
    cy.contains("button", "Add To Cart").click();

    // // Check for the snackbar
    // cy.get(".MuiAlert-message").should("contain", "Cart Item Added");

    // Check for the cart item
    cy.get(".cart_sidebar-list-container").within(() => {
      cy.get("li").contains("Double Chevron Decals").should("exist");
    });

    cy.contains("button", "Proceed to Checkout").click();

    cy.get('input[name="email"]').first().type("test@example.com");

    cy.contains("button", "Continue").click();

    cy.get('input[name="first_name"]').type("John");
    cy.get('input[name="last_name"]').type("Doe");
    cy.get('input[name="address_1"]').type("123 Main St");
    cy.get('input[name="address_2"]').type("Apt 4");
    cy.get('input[name="city"]').type("Springfield");
    cy.get(".shipping-container").within(() => {
      cy.get("select").select("IL"); // Select Illinois for State
    });
    cy.get('input[name="postalCode"]').type("62704");

    // Click continue
    cy.contains("button", "Continue").click();

    cy.contains("button", "Select", { timeout: 20000 }).first().click();

    cy.contains("button", "Continue").click();

    // Type card details
    cy.getStripeElement("cardNumber").type("4242424242424242");
    cy.getStripeElement("cardExpiry").type("10/30");
    cy.getStripeElement("cardCvc").type("424");
    cy.getStripeElement("postalCode").type("62704");

    cy.get('button[type="submit"]').contains("Complete Order").click();

    cy.get("h2", { timeout: 20000 }).should("contain", "Thank you for your Glow LEDs Order");

    cy.url().then(url => {
      const segments = url.split("/");

      const orderId = segments[segments.length - 1];

      console.log({ orderId });

      // Delete the order
      cy.request({
        method: "DELETE",
        url: `/api/orders/test_delete/${orderId}`,
      });
    });
  });
});
