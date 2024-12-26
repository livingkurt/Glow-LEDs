import { domain } from "../../background/worker_helpers.js";
import config from "../../config.js";
import Stripe from "stripe";
import paycheck_services from "../paychecks/paycheck_services.js";
import { determineRevenueTier } from "../../utils/util.js";
import promo_services from "../promos/promo_services.js";
import { getCodeUsage } from "../orders/order_interactors.js";

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});

// Function to create a Stripe account link
export const createStripeAccountLink = async () => {
  const account = await stripe.accounts.create({
    type: "express",
  });
  return stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${domain()}/secure/account/profile`,
    return_url: `${domain()}/secure/account/profile?stripe_success=true`,
    type: "account_onboarding",
  });
};

export const payoutAffiliate = async (affiliate, start_date, end_date) => {
  try {
    // Get promo code usage for the date range
    const promo_code_usage = await getCodeUsage({
      promo_code: affiliate?.public_code?.promo_code,
      start_date,
      end_date,
      sponsor: affiliate?.sponsor,
      sponsorTeamCaptain: affiliate?.sponsorTeamCaptain,
    });

    console.log({
      affiliate: affiliate?.artist_name,
      if: affiliate?.user?.stripe_connect_id && promo_code_usage.earnings >= 1,
    });

    console.log({
      amount: promo_code_usage.earnings,
      stripe_connect_id: affiliate?.user?.stripe_connect_id,
      description: `Monthly Payout for ${affiliate?.user?.first_name} ${affiliate?.user?.last_name}`,
    });

    // Only process Stripe payment if not in test mode
    if (!affiliate?.user?.stripe_connect_id || promo_code_usage.earnings > 0) {
      await stripe.transfers.create({
        amount: promo_code_usage.earnings,
        currency: "usd",
        destination: affiliate.user.stripe_connect_id,
        description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
      });
    }

    // Create paycheck record
    const paycheck = await paycheck_services.create_paychecks_s({
      affiliate: affiliate._id,
      user: affiliate.user._id,
      amount: promo_code_usage.earnings,
      revenue: promo_code_usage.revenue,
      promo_code: affiliate.public_code._id,
      uses: promo_code_usage.number_of_uses,
      stripe_connect_id: affiliate.user.stripe_connect_id,
      paid: !!affiliate?.user?.stripe_connect_id,
      description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
      paid_at: new Date(),
      email: affiliate.user.email,
      subject: "Your Glow LEDs Affiliate Earnings",
    });

    if (!paycheck) {
      console.error("Failed to create paycheck");
      return null;
    }

    console.log({ paycheck });

    // Update promo code tier
    const percentage_off = determineRevenueTier(affiliate, promo_code_usage.revenue);

    await promo_services.update_promos_s({ id: affiliate.private_code._id }, { percentage_off });

    console.log({ percentage_off });

    return paycheck;
  } catch (error) {
    console.error("Error processing affiliate payout:", error);
    throw error;
  }
};
