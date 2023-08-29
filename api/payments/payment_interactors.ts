import config from "../../config";

const stripe = require("stripe")(config.STRIPE_KEY);
// Function to create or update a Stripe customer
export const createOrUpdateCustomer = async (current_userrmation: any) => {
  return new Promise((resolve, reject) => {
    stripe.customers.create(
      {
        name: current_userrmation.name,
        email: current_userrmation.email,
        address: current_userrmation.address,
        payment_method: current_userrmation.payment_method,
      },
      (err: any, customer: any) => {
        if (err) {
          if (err.code === "resource_already_exists") {
            stripe.customers.retrieve(err.raw.requestId, (err: any, existingCustomer: any) => {
              if (err) reject(err);
              else resolve(existingCustomer);
            });
          } else {
            reject(err);
          }
        } else {
          resolve(customer);
        }
      }
    );
  });
};

// Function to create a payment intent
export const createPaymentIntent = async (customer: any, paymentInformation: any) => {
  return new Promise((resolve, reject) => {
    stripe.paymentIntents.create(
      {
        amount: paymentInformation.amount,
        currency: "usd",
        payment_method_types: ["card"],
        customer: customer.id,
      },
      (err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// Function to confirm a payment intent
export const confirmPaymentIntent = async (result: any, paymentMethodId: string) => {
  return new Promise((resolve, reject) => {
    stripe.paymentIntents.confirm(
      result.id,
      {
        payment_method: paymentMethodId,
      },
      (err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
