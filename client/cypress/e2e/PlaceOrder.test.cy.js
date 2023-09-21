/* global cy */

describe("Add to Cart", () => {
  it("should add a product to the cart", () => {
    cy.window().then(win => {
      win.localStorage.setItem("popup", '{"date":"2023-05-04T19:43:46.680Z","email":false}');
    });

    cy.visit("/collections/all/products/2016_batteries"); // Navigate to the products page
    cy.contains("button", "Add To Cart").click();

    // Check for the snackbar
    cy.get(".MuiAlert-message").should("contain", "Cart Item Added");

    // Check for the cart item
    cy.get(".cart_sidebar-list-container").within(() => {
      cy.get("li").contains("Bulk CR2016 Batteries").should("exist");
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

    cy.contains("button", "Select").first().click();

    cy.contains("button", "Continue").click();

    cy.get(".__PrivateStripeElement iframe").click();

    // Type card details
    cy.getStripeElement("cardNumber").type("4242424242424242");
    cy.getStripeElement("cardExpiry").type("10/30");
    cy.getStripeElement("cardCvc").type("424");
    cy.getStripeElement("postalCode").type("62704");

    cy.get('button[type="submit"]').contains("Complete Order").click();

    cy.get("h2").should("contain", "Thank you for your Glow LEDs Order");
  });
});
