import Stripe from "stripe";
import { domain } from "../../background/worker_helpers";
import { createStripeAccountLink } from "./affiliate_interactors";
if (!config.STRIPE_KEY) {
  throw new Error("STRIPE_KEY is not defined");
}
const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});

// Function to create a Stripe account link
export const createStripeAccountLink = async () => {
  const account = await stripe.accounts.create({
    type: "express",
  });
  return await Stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${domain()}/secure/account/profile`,
    return_url: `${domain()}/secure/account/profile?stripe_success=true`,
    type: "account_onboarding",
  });
};
