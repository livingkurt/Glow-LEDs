const stripe = require("stripe")("your_stripe_secret_key");

export const handlePayment = (
  userInformation: { name: string; email: string; phone: string; address: string },
  paymentInformation: { amount: number },
  order: unknown,
  req: unknown,
  res: unknown
): void => {
  stripe.customers.create(
    {
      name: userInformation.name,
      email: userInformation.email,
      phone: userInformation.phone,
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
                  phone: userInformation.phone,
                  address: userInformation.address
                },
                (err: any, updatedCustomer: any) => {
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

export const createPayment = (customerId: any, paymentInformation: any, order: any, req: any, res: any) => {
  stripe.paymentIntents.create(
    {
      amount: paymentInformation.amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customerId
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
};
