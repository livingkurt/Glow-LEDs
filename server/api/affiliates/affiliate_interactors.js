import { domain } from "../../background/worker_helpers.js";
import config from "../../config.js";
import Stripe from "stripe";
import paycheck_services from "../paychecks/paycheck_services.js";
import promo_services from "../promos/promo_services.js";
import { generateGiftCards, getCodeUsage } from "../orders/order_interactors.js";
import { determineRevenueTier } from "./affiliate_helpers.js";
import { sendGiftCardEmail } from "../emails/email_services.js";

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

const getLevelName = giftCardAmount => {
  switch (giftCardAmount) {
    case 100:
      return "Gold";
    case 75:
      return "Silver";
    case 50:
      return "Bronze";
    default:
      return "";
  }
};

const determineGiftCardAmount = (taskPoints, revenue, isFullLightshow) => {
  if (taskPoints >= 8 && isFullLightshow && revenue >= 500) {
    return 100; // Gold Level
  } else if (taskPoints >= 5 && isFullLightshow) {
    return 75; // Silver Level
  } else if (taskPoints >= 3) {
    return 50; // Bronze Level
  }
  return 0;
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

    const earnings = promo_code_usage.earnings;
    let description = `Monthly Payout for ${affiliate?.user?.first_name} ${affiliate?.user?.last_name}`;

    // Handle task-based gift cards for sponsored affiliates
    if (affiliate?.sponsor) {
      // Get tasks completed in the current month
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", { month: "long" });
      const currentYear = currentDate.getFullYear();

      const monthlyTasks =
        affiliate.sponsorTasks?.filter(
          task => task.month === currentMonth && task.year === currentYear && task.verified
        ) || [];

      // Calculate total points
      const totalPoints = monthlyTasks.reduce((sum, task) => sum + task.points, 0);

      // Check for lightshow task
      const isFullLightshow = monthlyTasks.some(task => task.isFullLightshow);

      // Determine gift card amount
      const giftCardAmount = determineGiftCardAmount(totalPoints, promo_code_usage.revenue, isFullLightshow);

      if (giftCardAmount > 0) {
        const level = getLevelName(giftCardAmount);
        // Generate gift card
        const giftCard = await generateGiftCards({
          amount: giftCardAmount,
          user: affiliate.user._id,
          description: `${currentMonth} ${currentYear} Sponsorship Reward - ${level} Level`,
        });

        // Send email notification
        await sendGiftCardEmail({
          email: affiliate.user.email,
          name: `${affiliate.user.first_name} ${affiliate.user.last_name}`,
          giftCardCode: giftCard.code,
          amount: giftCardAmount,
          level,
          taskPoints: totalPoints,
          completedTasks: monthlyTasks.map(task => task.taskName).join(", "),
        });

        description += ` (Including $${giftCardAmount} Gift Card for Task Completion)`;
      }
    }

    // Process Stripe payment for non-gift card earnings
    if (affiliate?.user?.stripe_connect_id && earnings > 0) {
      await stripe.transfers.create({
        amount: earnings,
        currency: "usd",
        destination: affiliate.user.stripe_connect_id,
        description,
      });
    }

    // Create paycheck record
    const paycheck = await paycheck_services.create_paychecks_s({
      affiliate: affiliate._id,
      user: affiliate.user._id,
      amount: earnings,
      revenue: promo_code_usage.revenue,
      promo_code: affiliate.public_code._id,
      uses: promo_code_usage.number_of_uses,
      stripe_connect_id: affiliate.user.stripe_connect_id,
      paid: !!affiliate?.user?.stripe_connect_id,
      description,
      paid_at: new Date(),
      email: affiliate.user.email,
      subject: "Your Glow LEDs Affiliate Earnings",
    });

    if (!paycheck) {
      console.error("Failed to create paycheck");
      return null;
    }

    // Update promo code tier
    const percentage_off = determineRevenueTier(affiliate, promo_code_usage.revenue);
    await promo_services.update_promos_s({ id: affiliate.private_code._id }, { percentage_off });

    return paycheck;
  } catch (error) {
    console.error("Error processing affiliate payout:", error);
    throw error;
  }
};
