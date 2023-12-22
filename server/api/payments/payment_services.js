import Stripe from "stripe";
import config from "../../config";

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});

export default {
  secure_payout_payments_s: async body => {
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
  },
};
