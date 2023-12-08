import config from "../../config";

import Stripe from "stripe";

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});
// Function to create or update a Stripe customer

export const createOrUpdateCustomer = async current_userrmation => {
  // In createOrUpdateCustomer

  try {
    const customer = await stripe.customers.create({
      name: current_userrmation.name,
      email: current_userrmation.email,
      address: current_userrmation.address,
      payment_method: current_userrmation.payment_method,
    });
    return customer;
  } catch (error) {
    if (error.code === "resource_already_exists") {
      const existingCustomer = await stripe.customers.retrieve(error.raw.requestId);
      return existingCustomer;
    } else {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
};

// Function to create a payment intent
export const createPaymentIntent = async (customer, paymentInformation) => {
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
export const confirmPaymentIntent = async (result, paymentMethodId) => {
  try {
    const confirmedResult = await stripe.paymentIntents.confirm(result.id, {
      payment_method: paymentMethodId,
    });
    console.log({ charges: confirmedResult });

    // Retrieve balance transaction to get Stripe fee
    // const balanceTransaction = await stripe.balanceTransactions.retrieve(
    //   confirmedResult.charges.data[0].balance_transaction
    // );

    // const stripeFee = balanceTransaction.fee;

    // await expense_db.create_expenses_db({
    //   expense_name: "Stripe Fee",
    //   amount: stripeFee,
    //   category: "Stripe Fee",
    //   date_of_purchase: Date.now(),
    //   place_of_purchase: "Stripe",
    //   application: "Payments",
    // });
    // console.log({ stripeFee });
    return confirmedResult;
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// Function to confirm a payment intent
export const updateOrder = async (order, confirmedPayment, paymentMethod) => {
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
