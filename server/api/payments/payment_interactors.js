import { expense_db } from "../expenses";
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

// Function to confirm a payment intent and fetch fees
export const confirmPaymentIntent = async (result, paymentMethodId) => {
  try {
    const confirmedResult = await stripe.paymentIntents.confirm(result.id, {
      payment_method: paymentMethodId,
    });

    return confirmedResult;
  } catch (error) {
    console.error({ error });
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

// Function to confirm a payment intent
export const logStripeFeeToExpenses = async confirmedResult => {
  try {
    // Fetch all charges for this payment intent
    const charges = await stripe.charges.list({
      payment_intent: confirmedResult.id,
    });

    // Assuming the relevant charge is the first one
    const relevantCharge = charges.data[0];

    // Retrieve balance transaction to get Stripe fee
    const balanceTransaction = await stripe.balanceTransactions.retrieve(relevantCharge.balance_transaction);
    const stripeFee = balanceTransaction.fee;

    // Create an expense record for the Stripe fee
    await expense_db.create_expenses_db({
      expense_name: "Stripe Fee",
      amount: stripeFee / 100,
      category: "Stripe Fees",
      date_of_purchase: Date.now(),
      place_of_purchase: "Stripe",
      irs_category: "Bank Fees",
      card: "Stripe",
      application: "Payments",
    });
  } catch (feeError) {
    console.error("Error tracking Stripe fee:", feeError);
  }
};


export const payoutConnectAccount =  async body => {
  const { stripe_connect_id, amount, description } = body;
  try {
    const transferAmount = Math.round(amount * 100); // amount to transfer, in cents
    const transferCurrency = "USD"; // currency for the transfer
    const transferDescription = description; // description for the transfer
    const connectedAccountId = stripe_connect_id; // ID of the connected account to transfer to

    // Create the recurring transfer
    return await stripe.transfers.create({
      amount: transferAmount,
      currency: transferCurrency,
      description: transferDescription,
      destination: connectedAccountId,
      metadata: { transfer_group: "weekly_payout" },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
