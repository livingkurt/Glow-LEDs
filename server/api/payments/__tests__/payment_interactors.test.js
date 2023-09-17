import Stripe from "stripe";
import { confirmPaymentIntent, createOrUpdateCustomer, createPaymentIntent, updateOrder } from "../payment_interactors";

jest.mock("stripe", () => {
  return jest.fn().mockImplementation(() => {
    return {
      customers: {
        create: jest.fn().mockResolvedValue({ id: "cus_123" }),
      },
      paymentIntents: {
        create: jest.fn().mockResolvedValue({ id: "pi_123" }),
        confirm: jest.fn().mockResolvedValue({ id: "pi_confirmed_123" }),
      },
    };
  });
});

const stripe = new Stripe("fake_key", { apiVersion: "2023-08-16" });

describe("Payment Interactor", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create or update a Stripe customer", async () => {
    // Clear the mock
    stripe.customers.create.mockClear();

    const fakeUser = {
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      payment_method: "card_123",
    };

    const result = await createOrUpdateCustomer(fakeUser);

    // Check result and mock calls
    expect(result.id).toBe("cus_123");
    // expect(stripe.customers.create.mock.calls).toEqual([[fakeUser]]);
  });

  it("should create a payment intent", async () => {
    const fakeCustomer = { id: "cus_123" };
    const fakePaymentInformation = { amount: 1000 };

    stripe.paymentIntents.create.mockResolvedValue({ id: "pi_123" });

    const result = await createPaymentIntent(fakeCustomer, fakePaymentInformation);

    expect(result.id).toBe("pi_123");
    // expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
    //   amount: fakePaymentInformation.amount,
    //   currency: "usd",
    //   payment_method_types: ["card"],
    //   customer: fakeCustomer.id,
    // });
  });

  it("should confirm a payment intent", async () => {
    const fakeResult = { id: "pi_123" };
    const fakePaymentMethodId = "pm_123";

    stripe.paymentIntents.confirm.mockResolvedValue({ id: "pi_confirmed_123" });

    const result = await confirmPaymentIntent(fakeResult, fakePaymentMethodId);

    expect(result.id).toBe("pi_confirmed_123");
    // expect(stripe.paymentIntents.confirm).toHaveBeenCalledWith(fakeResult.id, {
    //   payment_method: fakePaymentMethodId,
    // });
  });

  it("should update an order", async () => {
    const fakeOrder = {
      isPaid: false,
      save: jest.fn().mockResolvedValue(true),
    };
    const fakeConfirmedPayment = { id: "pi_123" };
    const fakePaymentMethod = "pm_123";

    const result = await updateOrder(fakeOrder, fakeConfirmedPayment, fakePaymentMethod);

    expect(result).toBeTruthy();
    expect(fakeOrder.isPaid).toBe(true);
    expect(fakeOrder.save).toHaveBeenCalled();
  });
});
