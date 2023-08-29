import config from "../../config";

import Stripe from "stripe";
if (!config.STRIPE_KEY) {
  throw new Error("STRIPE_KEY is not defined");
}
const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});
// Function to create or update a Stripe customer
interface CustomerInformation {
  name: string;
  email: string;
  address: Stripe.AddressParam;
  payment_method: string;
}

export const createOrUpdateCustomer = async (current_userrmation: CustomerInformation) => {
  try {
    const customer = await stripe.customers.create({
      name: current_userrmation.name,
      email: current_userrmation.email,
      address: current_userrmation.address,
      payment_method: current_userrmation.payment_method,
    });
    return customer;
  } catch (error: any) {
    if (error.code === "resource_already_exists") {
      const existingCustomer = await stripe.customers.retrieve(error.raw.requestId as string);
      return existingCustomer;
    } else {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};

// Function to create a payment intent
export const createPaymentIntent = async (customer: any, paymentInformation: any) => {
  try {
    const result = await stripe.paymentIntents.create({
      amount: paymentInformation.amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customer.id,
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// Function to confirm a payment intent
export const confirmPaymentIntent = async (result: any, paymentMethodId: string) => {
  try {
    const confirmedResult = await stripe.paymentIntents.confirm(result.id, {
      payment_method: paymentMethodId,
    });
    return confirmedResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// Function to confirm a payment intent
export const updateOrder = async (order: any, confirmedPayment: any, paymentMethod: any) => {
  try {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "stripe",
      charge: confirmedPayment,
      payment: paymentMethod,
    };

    return await order.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
