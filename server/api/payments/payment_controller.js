import { user_db } from "../users";
import config from "../../config";
import { Order } from "../orders";
import { normalizeCustomerInfo, normalizePaymentInfo } from "./payment_helpers";
import { confirmPaymentIntent, createOrUpdateCustomer, createPaymentIntent, updateOrder } from "./payment_interactors";
import Stripe from "stripe";
if (!config.STRIPE_KEY) {
  throw new Error("STRIPE_KEY is not defined");
}
const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});

export default {
  secure_pay_payments_c: async (req, res) => {
    const { paymentMethod } = req.body;
    try {
      const order = await Order.findById(req.params.id).populate("user");
      const current_userrmation = normalizeCustomerInfo({ shipping: order.shipping, paymentMethod });
      const paymentInformation = normalizePaymentInfo({ totalPrice: order.totalPrice });
      const customer = await createOrUpdateCustomer(current_userrmation);
      const paymentIntent = await createPaymentIntent(customer, paymentInformation);
      const confirmedPayment = await confirmPaymentIntent(paymentIntent, paymentMethod.id);
      const updatedOrder = await updateOrder(order, confirmedPayment, paymentMethod);

      if (updatedOrder) {
        res.send({ message: "Order Paid.", order: updatedOrder });
      } else {
        res.status(500).send({ message: "Error Saving Payment" });
      }
    } catch (error) {
      res.status(500).send({
        error,
        message: error.message,
        solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support",
      });
    }
  },
  secure_refund_payments_c: async (req, res) => {
    const { order_id } = req.params;
    try {
      //
      const order = await Order.findById(order_id);
      const refundAmount = parseFloat(req.body.refundAmount) * 100;
      const roundedRefundAmount = Math.round(refundAmount);

      const refund = await stripe.refunds.create({
        payment_intent: order.payment.charge.id,
        amount: roundedRefundAmount,
      });
      if (refund) {
        const all_refunds = [...order.payment.refund, refund];
        const refundTotal = all_refunds.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0);
        order.isRefunded = true;
        order.refundedAt = Date.now();
        order.payment = {
          paymentMethod: order.payment.paymentMethod,
          charge: order.payment.charge,
          refund: [...order.payment.refund, refund],
          refund_reason: [...order.payment.refund_reason, req.body.refundReason],
        };
        order.refundTotal = refundTotal;
        const updated = await Order.updateOne({ _id: order_id }, order);

        if (updated) {
          res.send(order);
        } else {
          res.status(404).send({ message: "Order not Updated." });
        }
      } else {
        res.status(500).send({ message: "Refund not Created" });
      }
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  secure_payout_payments_c: async (req, res) => {
    const { stripe_connect_id, amount, description } = req.body;
    try {
      const transferAmount = Math.round(amount * 100); // amount to transfer, in cents
      const transferCurrency = "USD"; // currency for the transfer
      const transferDescription = description; // description for the transfer
      const connectedAccountId = stripe_connect_id; // ID of the connected account to transfer to

      // Create the recurring transfer
      const transfer = await stripe.transfers.create({
        amount: transferAmount,
        currency: transferCurrency,
        description: transferDescription,
        destination: connectedAccountId,
        metadata: { transfer_group: "weekly_payout" },
      });

      res.status(200).send({ message: `Transfer to Connected Account Success: ${transfer.id}` });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
  stripe_account_payments_c: async (req, res) => {
    const { user_id } = req.params;

    try {
      // Fetch the user from MongoDB
      const user = await user_db.findById_users_db(user_id);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // Fetch the Stripe account using the email
      const accounts = await stripe.accounts.list({
        limit: 100,
      });

      // Find by email from accounts.data
      const stripeAccount = accounts.data.find(account => account.email === user.email);

      console.log({ stripeAccount });

      if (!stripeAccount) {
        return res.status(404).send({ message: "Stripe account not found" });
      }

      // Update the user with Stripe account ID
      user.stripe_connect_id = stripeAccount.id;
      await user.save();

      res.status(200).send({ message: `Stripe Account Connected to: ${user_id}`, stripeAccountId });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
