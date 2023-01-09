import { handlePayment } from "../interactors/affiliate_interactors";
import { Order } from "../models";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

export default {
  secure_pay_payments_c: async (req: any, res: any) => {
    try {
      const order = await Order.findById(req.params.id).populate("user");
      const userInformation = {
        name: order.shipping.first_name + " " + order.shipping.last_name,
        email: order.shipping.email,
        address: {
          city: order.shipping.city,
          country: order.shipping.country,
          line1: order.shipping.address_1,
          line2: order.shipping.address_2,
          postal_code: order.shipping.postalCode,
          state: order.shipping.state
        }
      };
      const paymentInformation = {
        amount: (order.totalPrice * 100).toFixed(0),
        currency: "usd",
        payment_method_types: ["card"]
      };

      stripe.customers.create(
        {
          name: userInformation.name,
          email: userInformation.email,
          address: userInformation.address
        },
        (err: any, customer: any) => {
          if (err) {
            // An error occurred, check if the error is because the customer already exists
            if (err.code === "resource_already_exists") {
              // Get the existing customer
              stripe.customers.retrieve(err.raw.requestId, (err: any, existingCustomer: any) => {
                if (err) {
                  // An error occurred, handle it
                } else {
                  // Update the existing customer with the new information
                  stripe.customers.update(
                    existingCustomer.id,
                    {
                      name: userInformation.name,
                      address: userInformation.address
                    },
                    (err: any, updatedCustomer: any) => {
                      if (err) {
                        // An error occurred, handle it
                      } else {
                        // Customer was updated successfully, create the payment using the customer's ID
                        stripe.paymentIntents.create(
                          {
                            amount: paymentInformation.amount,
                            currency: "usd",
                            payment_method_types: ["card"],
                            customer: updatedCustomer.id
                          },
                          async (err: any, result: any) => {
                            if (err) {
                              return res.status(500).send({
                                error: err,
                                message: err.raw.message,
                                solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
                              });
                            } else {
                              await stripe.paymentIntents.confirm(
                                result.id,
                                {
                                  payment_method: req.body.paymentMethod.id
                                },
                                async (err: any, result: any) => {
                                  if (err) {
                                    return res.status(500).send({
                                      error: err,
                                      message: err.raw.message,
                                      solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
                                    });
                                  } else {
                                    order.isPaid = true;
                                    order.paidAt = Date.now();
                                    order.payment = {
                                      paymentMethod: "stripe",
                                      charge: result,
                                      payment: req.body.paymentMethod
                                    };

                                    const updatedOrder = await order.save();
                                    if (updatedOrder) {
                                      res.send({ message: "Order Paid.", order: updatedOrder });
                                    } else {
                                      return res.status(500).send({
                                        error: err,
                                        message: "Error Saving Payment",
                                        solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
                                      });
                                    }
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              });
            } else {
              // An error occurred, handle it
            }
          } else {
            // Customer was created successfully, create the payment using the customer's ID
            stripe.paymentIntents.create(
              {
                amount: paymentInformation.amount,
                currency: "usd",
                payment_method_types: ["card"],
                customer: customer.id
              },
              async (err: any, result: any) => {
                if (err) {
                  return res.status(500).send({
                    error: err,
                    message: err.raw.message,
                    solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
                  });
                } else {
                  await stripe.paymentIntents.confirm(
                    result.id,
                    {
                      payment_method: req.body.paymentMethod.id
                    },
                    async (err: any, result: any) => {
                      if (err) {
                        return res.status(500).send({
                          error: err,
                          message: err.raw.message,
                          solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
                        });
                      } else {
                        order.isPaid = true;
                        order.paidAt = Date.now();
                        order.payment = {
                          paymentMethod: "stripe",
                          charge: result,
                          payment: req.body.paymentMethod
                        };

                        const updatedOrder = await order.save();
                        if (updatedOrder) {
                          res.send({ message: "Order Paid.", order: updatedOrder });
                        } else {
                          return res.status(500).send({
                            error: err,
                            message: "Error Saving Payment",
                            solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
                          });
                        }
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        error,
        message: "Error Paying for Order",
        solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support"
      });
    }
  },
  secure_refund_payments_c: async (req: any, res: any) => {
    try {
      //
      const order = await Order.findById(req.params.id);
      const refund = await stripe.refunds.create({
        payment_intent: order.payment.charge.id,
        amount: (parseFloat(req.body.refund_amount) * 100).toFixed(0)
      });

      if (refund) {
        order.isRefunded = true;
        order.refundedAt = Date.now();
        order.payment = {
          paymentMethod: order.payment.paymentMethod,
          charge: order.payment.charge,
          refund: [...order.payment.refund, refund],
          refund_reason: [...order.payment.refund_reason, req.body.refund_reason]
        };
        const updated = await Order.updateOne({ _id: req.params.id }, order);

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
      console.log({ stripe_connect_id, amount, description });
      const transferAmount = amount * 100; // amount to transfer, in cents
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
          metadata: { transfer_group: "weekly_payout" }
        },
        (err: any, transfer: any) => {
          if (err) {
            // An error occurred while creating the transfer
            console.error(err);
          } else {
            // Transfer was successfully created
            console.log(`Transfer to Connected Account Success: ${transfer.id}`);
            res.status(200).send({ message: `Transfer to Connected Account Success: ${transfer.id}` });
          }
        }
      );
      return "Success";
    } catch (error) {
      res.status(500).send({ error, message: "Error Tranfering Funds" });
    }
  }
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
