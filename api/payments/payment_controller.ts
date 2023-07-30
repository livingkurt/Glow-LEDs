import config from "../../config";
import { Order } from "../orders";
import {
  confirmPaymentIntent,
  createCustomer,
  createPaymentIntent,
  retrieveCustomer,
  updateCustomer,
} from "./payment_helpers";
const stripe = require("stripe")(config.STRIPE_KEY);

export default {
  secure_pay_payments_c: async (req: any, res: any) => {
    const { paymentMethod } = req.body;
    try {
      const order = await Order.findById(req.params.id).populate("user");
      const current_userrmation = {
        name: order.shipping.first_name + " " + order.shipping.last_name,
        email: order.shipping.email,
        address: {
          city: order.shipping.city,
          country: order.shipping.country,
          line1: order.shipping.address_1,
          line2: order.shipping.address_2,
          postal_code: order.shipping.postalCode,
          state: order.shipping.state,
        },
        payment_method: paymentMethod.id,
      };
      const paymentInformation = {
        amount: (order.totalPrice * 100).toFixed(0),
        currency: "usd",
        payment_method_types: ["card"],
      };
      let customer;
      try {
        customer = await createCustomer(current_userrmation);
      } catch (err) {
        if (err.code === "resource_already_exists") {
          const existingCustomer: any = await retrieveCustomer(err.raw.requestId);
          customer = await updateCustomer(existingCustomer.id, current_userrmation);
        } else {
          throw err;
        }
      }

      const paymentIntent: any = await createPaymentIntent(paymentInformation, customer.id);
      const confirmedPaymentIntent: any = await confirmPaymentIntent(paymentIntent.id, paymentMethod.id);
      console.log({ confirmedPaymentIntent });

      // Check if the order has been paid before
      if (!order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
      }

      // Add the new payment to the payments array
      order.transactions.push({
        paymentType: "stripe",
        payment: confirmedPaymentIntent,
        paymentMethod: paymentMethod,
      });

      const updatedOrder = await order.save();
      if (updatedOrder) {
        res.send({ message: "Order Paid.", order: updatedOrder });
      } else {
        throw new Error("Error Saving Payment");
      }
    } catch (error) {
      res.status(500).send({
        error,
        message: "Error Paying for Order",
        solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support",
      });
    }
  },

  secure_refund_payments_c: async (req: any, res: any) => {
    const { order_id } = req.params;
    try {
      const order = await Order.findById(order_id);
      const refund = await stripe.refunds.create({
        payment_intent: order.transactions.find((transaction: any) => transaction.paymentType === "stripe").payment.id,
        amount: (parseFloat(req.body.refundAmount) * 100).toFixed(0),
      });

      if (refund) {
        order.transactions.push({
          refund,
          refundReason: req.body.refundReason,
        });

        const refundTotal = order.transactions.reduce((acc: number, transaction: any) => {
          return acc + (transaction.refund ? transaction.refund.amount : 0);
        }, 0);

        order.isRefunded = true;
        order.refundedAt = Date.now();
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
      res.status(500).send({ error, message: "Error Refunding Order" });
    }
  },

  secure_payout_payments_c: async (req: any, res: any) => {
    const { stripe_connect_id, amount, description } = req.body;
    try {
      const transferAmount = Math.round(amount * 100); // amount to transfer, in cents
      const transferCurrency = "USD"; // currency for the transfer
      const transferDescription = description; // description for the transfer
      const connectedAccountId = stripe_connect_id; // ID of the connected account to transfer to
      // Create the recurring transfer
      stripe.transfers.create(
        {
          amount: transferAmount,
          currency: transferCurrency,
          description: transferDescription,
          destination: connectedAccountId,
          metadata: { transfer_group: "weekly_payout" },
        },
        (err: any, transfer: any) => {
          if (err) {
            // An error occurred while creating the transfer
            console.error(err);
          } else {
            // Transfer was successfully created
            res.status(200).send({ message: `Transfer to Connected Account Success: ${transfer.id}` });
          }
        }
      );
      return "Success";
    } catch (error) {
      res.status(500).send({ error, message: "Error Tranfering Funds" });
    }
  },
};

// import { payment_services } from '../services';

// export default {
// 	secure_pay_payments_c: async (req: any, res: any) => {
// 		const { params, body } = req;
// 		try {
// 			const payment = await payment_services.secure_pay_payments_s(params, body);
// 			if (payment) {
// 				return res.status(200).send(payment);
// 			}
// 			return res.status(500).send({ message: 'Error Updating Chip' });
// 		} catch (error) {
//
// 			res.status(500).send({ error, message: 'Error Updating Chip' });
// 		}
// 	},
// 	guest_pay_payments_c: async (req: any, res: any) => {
// 		const { params, body } = req;
// 		try {
// 			const payment = await payment_services.guest_pay_payments_s(params, body);
// 			if (payment) {
// 				return res.status(200).send(payment);
// 			}
// 			return res.status(500).send({ message: 'Error Updating Chip' });
// 		} catch (error) {
//
// 			res.status(500).send({ error, message: 'Error Updating Chip' });
// 		}
// 	},
// 	secure_refund_payments_c: async (req: any, res: any) => {
// 		const { params, body } = req;
// 		try {
// 			const payment = await payment_services.secure_refund_payments_s(params, body);
// 			if (payment) {
// 				return res.status(200).send(payment);
// 			}
// 			return res.status(500).send({ message: 'Error Updating Chip' });
// 		} catch (error) {
//
// 			res.status(500).send({ error, message: 'Error Updating Chip' });
// 		}
// 	}
// };
