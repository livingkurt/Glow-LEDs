import expense_db from "../expenses/expense_db.js";
import config from "../../config.js";

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
    } else if (error instanceof Error) {
      throw new Error(error.message);
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
// Function to update order after payment confirmation
export const updateOrder = async (order, confirmedPayment, paymentMethod, hasPreOrderItems) => {
  try {
    // Set the status based on whether the order contains pre-order items
    if (hasPreOrderItems) {
      order.status = "paid_pre_order";
    } else if (order.status !== "paid_pre_order") {
      order.status = "paid";
    }

    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: confirmedPayment ? "stripe" : "none",
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
      is_direct_expense: true,
      irs_category: "Bank Fees",
      card: "Stripe",
      application: "Payments",
    });
  } catch (feeError) {
    console.error("Error tracking Stripe fee:", feeError);
  }
};

export const affiliatePayoutPayments = async (earnings, stripeConnectId, description) => {
  try {
    // Parse the earnings to ensure it's a number and round to 2 decimal places
    const formattedEarnings = parseFloat(earnings).toFixed(2);
    // Convert to cents and ensure it's an integer
    const amountInCents = Math.round(parseFloat(formattedEarnings) * 100);

    await stripe.transfers.create({
      amount: amountInCents,
      currency: "usd",
      destination: stripeConnectId,
      description,
    });
  } catch (error) {
    console.error("Error processing affiliate payout:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
