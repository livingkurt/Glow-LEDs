const stripe = require("stripe")("your_stripe_secret_key");

export const handlePayment = (current_userrmation, paymentInformation, order, req, res) => {
  stripe.customers.create(
    {
      name: current_userrmation.name,
      email: current_userrmation.email,
      phone: current_userrmation.phone,
      address: current_userrmation.address,
    },
    (err, customer) => {
      if (err) {
        // An error occurred, check if the error is because the customer already exists
        if (err.code === "resource_already_exists") {
          // Get the existing customer
          stripe.customers.retrieve(err.raw.requestId, (err, existingCustomer) => {
            if (err) {
              // An error occurred, handle it
            } else {
              // Update the existing customer with the new information
              stripe.customers.update(
                existingCustomer.id,
                {
                  name: current_userrmation.name,
                  phone: current_userrmation.phone,
                  address: current_userrmation.address,
                },
                (err, updatedCustomer) => {
                  if (err) {
                    // An error occurred, handle it
                  } else {
                    // Customer was updated successfully, create the payment using the customer's ID
                    createPayment(updatedCustomer.id, paymentInformation, order, req, res);
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
        createPayment(customer.id, paymentInformation, order, req, res);
      }
    }
  );
};

export const createPayment = (customerId, paymentInformation, order, req, res) => {
  stripe.paymentIntents.create(
    {
      amount: paymentInformation.amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customerId,
    },
    async (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err,
          message: err.raw.message,
          solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support",
        });
      } else {
        await stripe.paymentIntents.confirm(
          result.id,
          {
            payment_method: req.body.paymentMethod.id,
          },
          async (err, result) => {
            if (err) {
              return res.status(500).send({
                error: err,
                message: err.raw.message,
                solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support",
              });
            } else {
              order.isPaid = true;
              order.paidAt = Date.now();
              order.payment = {
                paymentMethod: "stripe",
                charge: result,
                payment: req.body.paymentMethod,
              };

              const updatedOrder = await order.save();
              if (updatedOrder) {
                res.send({ message: "Order Paid.", order: updatedOrder });
              } else {
                return res.status(500).send({
                  error: err,
                  message: "Error Saving Payment",
                  solution: "Please Try a Different Card if Error Persists and Contact Glow LEDs for Support",
                });
              }
            }
          }
        );
      }
    }
  );
};
