import { domain } from "../../background/worker_helpers";
import { createStripeAccountLink } from "./affiliate_interactors";
import { domain } from "../../background/worker_helpers";

// Function to create a Stripe account link
export const createStripeAccountLink = async stripe => {
  const account = await stripe.accounts.create({
    type: "express",
  });
  return await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${domain()}/secure/account/profile`,
    return_url: `${domain()}/secure/account/profile?stripe_success=true`,
    type: "account_onboarding",
  });
};
