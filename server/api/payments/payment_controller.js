import user_db from "../users/user_db.js";
import config from "../../config.js";
import Order from "../orders/order.js";
import { normalizeCustomerInfo, normalizePaymentInfo } from "./payment_helpers.js";
import {
  confirmPaymentIntent,
  createOrUpdateCustomer,
  createPaymentIntent,
  logStripeFeeToExpenses,
  updateOrder,
} from "./payment_interactors.js";
import Stripe from "stripe";

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
      await logStripeFeeToExpenses(confirmedPayment);
      const updatedOrder = await updateOrder(order, confirmedPayment, paymentMethod);
      console.log("ordersChanged socket triggered");
      req.io.emit("ordersChanged");
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
    const { refundReason, refundAmount, current_user } = req.body;
    try {
      //
      const order = await Order.findById(order_id);
      const roundedRefundAmount = Math.round(parseFloat(refundAmount) * 100);

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
          refund_reason: [...order.payment.refund_reason, refundReason],
        };
        order.refundTotal = refundTotal;
        order.change_log = [
          ...order.change_log,
          {
            change: refundReason,
            changedAt: new Date(),
            changedBy: current_user,
          },
        ];
        const updated = await Order.updateOne({ _id: order_id }, order);

        if (updated) {
          console.log("ordersChanged socket triggered");
          req.io.emit("ordersChanged");
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

      if (!stripeAccount) {
        return res.status(404).send({ message: "Stripe account not found" });
      }

      // Update the user with Stripe account ID
      await user_db.update_users_db({ _id: user._id }, { stripe_connect_id: stripeAccount.id });

      res.status(200).send({ message: `Stripe Account Connected to: ${user.first_name} ${user.last_name}` });
    } catch (error) {
      res.status(500).send({ error, message: error.message });
    }
  },
};
