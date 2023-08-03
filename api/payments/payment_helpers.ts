// @ts-nocheck

import config from "../../config";
const stripe = require("stripe")(config.STRIPE_KEY);

// Helper functions
export const createCustomer = async current_userrmation => {
  return new Promise((resolve, reject) => {
    stripe.customers.create(current_userrmation, (err, customer) => {
      if (err) reject(err);
      else resolve(customer);
    });
  });
};

export const retrieveCustomer = async requestId => {
  return new Promise((resolve, reject) => {
    stripe.customers.retrieve(requestId, (err, customer) => {
      if (err) reject(err);
      else resolve(customer);
    });
  });
};

export const updateCustomer = async (customerId, current_userrmation) => {
  return new Promise((resolve, reject) => {
    stripe.customers.update(customerId, current_userrmation, (err, customer) => {
      if (err) reject(err);
      else resolve(customer);
    });
  });
};

export const createPaymentIntent = async (paymentInformation, customerId) => {
  return new Promise((resolve, reject) => {
    stripe.paymentIntents.create(
      {
        ...paymentInformation,
        customer: customerId,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const confirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
  return new Promise((resolve, reject) => {
    stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: paymentMethodId,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
