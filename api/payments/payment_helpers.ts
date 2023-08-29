export const normalizeCustomerInfo = ({ shipping, paymentMethod }: any) => ({
  name: shipping.first_name + " " + shipping.last_name,
  email: shipping.email,
  address: {
    city: shipping.city,
    country: shipping.country,
    line1: shipping.address_1,
    line2: shipping.address_2,
    postal_code: shipping.postalCode,
    state: shipping.state,
  },
  payment_method: paymentMethod.id,
});

export const normalizePaymentInfo = ({ totalPrice }: any) => ({
  amount: (totalPrice * 100).toFixed(0),
  currency: "usd",
  payment_method_types: ["card"],
});
