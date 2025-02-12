import { domain } from "../../background/worker_helpers.js";
import config from "../../config.js";
import Stripe from "stripe";
import paycheck_services from "../paychecks/paycheck_services.js";
import promo_services from "../promos/promo_services.js";
import { generateGiftCard, getCodeUsage } from "../orders/order_interactors.js";
import { determineRevenueTier } from "./affiliate_helpers.js";
import payment_controller from "../payments/payment_controller.js";
import { sendEmail } from "../emails/email_interactors.js";
import AffiliateEarningsTemplate from "../../email_templates/pages/AffiliateEarningsTemplate.js";
import App from "../../email_templates/App.js";
import { affiliatePayoutPayments } from "../payments/payment_interactors.js";

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
  console.log("Getting level name for amount:", giftCardAmount);
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
  console.log("Determining gift card amount:", { taskPoints, revenue, isFullLightshow });
  if (taskPoints >= 8 && isFullLightshow && revenue >= 500) {
    return 100; // Gold Level
  } else if (taskPoints >= 5 && isFullLightshow) {
    return 75; // Silver Level
  } else if (taskPoints >= 3) {
    return 50; // Bronze Level
  }
  return 0;
};

export const sendAffiliateEarningsEmail = async ({
  email,
  affiliate,
  giftCard,
  level,
  monthlyTasks,
  promoCodeUsage,
}) => {
  const subject = `Your Glow LEDs Affiliate Earnings`;

  // Convert single gift card to array format expected by template
  const giftCardArray = giftCard
    ? [
        {
          initialBalance: giftCard.initialBalance,
          quantity: 1,
          codes: [giftCard.code],
          display_image_object: giftCard.display_image_object,
        },
      ]
    : [];

  const mailOptionsConfirmation = {
    from: config.DISPLAY_INFO_EMAIL,
    to: email,
    subject,
    html: App({
      body: AffiliateEarningsTemplate(giftCardArray, affiliate, level, monthlyTasks, affiliate.sponsor, {
        codeUses: promoCodeUsage.number_of_uses,
        revenue: promoCodeUsage.revenue,
        earnings: promoCodeUsage.earnings,
        percentageOff: affiliate.private_code.percentage_off,
      }),
      unsubscribe: false,
    }),
    headers: {
      "Precedence": "transactional",
      "X-Auto-Response-Suppress": "OOF, AutoReply",
    },
  };

  await sendEmail(mailOptionsConfirmation);
  return email;
};

const processGiftCardRewards = async (affiliate, promoCodeUsage) => {
  console.log("Processing gift card rewards for:", {
    affiliateName: affiliate.artist_name,
    currentRevenue: promoCodeUsage.revenue,
  });

  // Use previous month for task calculations
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1); // Get previous month
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  console.log("Calculating rewards for:", { month: currentMonth, year: currentYear });

  const monthlyTasks =
    affiliate.sponsorTasks?.filter(task => task.month === currentMonth && task.year === currentYear && task.verified) ||
    [];

  console.log("Found monthly tasks:", {
    totalTasks: monthlyTasks.length,
    tasks: monthlyTasks.map(task => ({
      name: task.taskName,
      points: task.points,
      isFullLightshow: task.isFullLightshow,
    })),
  });

  const totalPoints = monthlyTasks.reduce((sum, task) => sum + task.points, 0);
  const isFullLightshow = monthlyTasks.some(task => task.isFullLightshow);

  console.log("Task summary:", {
    totalPoints,
    isFullLightshow,
    revenue: promoCodeUsage.revenue,
  });

  const giftCardAmount = determineGiftCardAmount(totalPoints, promoCodeUsage.revenue, isFullLightshow);

  console.log("Determined gift card amount:", { giftCardAmount });

  if (giftCardAmount === 0) {
    return { giftCardAmount: null, monthlyTasks };
  }

  const level = getLevelName(giftCardAmount);

  const giftCard = await generateGiftCard({
    amount: giftCardAmount,
  });

  return { giftCardAmount, giftCard, level, monthlyTasks };
};

const createPaycheckRecord = async (affiliate, earnings, promoCodeUsage, description) => {
  console.log("Creating paycheck record:", {
    affiliate: affiliate._id,
    earnings,
    promoCodeUsage,
  });

  const paycheck = await paycheck_services.create_paychecks_s({
    affiliate: affiliate._id,
    user: affiliate.user._id,
    amount: earnings,
    revenue: promoCodeUsage.revenue,
    promo_code: affiliate.public_code._id,
    uses: promoCodeUsage.number_of_uses,
    stripe_connect_id: affiliate.user.stripe_connect_id,
    paid: !!affiliate.user.stripe_connect_id,
    description,
    paid_at: new Date(),
    email: affiliate.user.email,
    subject: "Your Glow LEDs Affiliate Earnings",
  });

  if (!paycheck) {
    console.error("Failed to create paycheck record");
    throw new Error("Failed to create paycheck");
  }
  console.log("Successfully created paycheck:", paycheck);
  return paycheck;
};

export const payoutAffiliate = async (affiliate, start_date, end_date) => {
  const INCLUDE_PAYMENTS = true;
  const INCLUDE_EMAILS = true;
  const INCLUDE_PAYCHECKS = true;
  const INCLUDE_PROMO_TIER_UPDATE = true;
  const INCLUDE_GIFT_CARDS = true;
  try {
    console.log("Starting affiliate payout process for:", {
      affiliate: affiliate.artist_name,
      start_date,
      end_date,
    });

    const promoCodeUsage = await getCodeUsage({
      promo_code: affiliate?.public_code?.promo_code,
      start_date,
      end_date,
      sponsor: affiliate?.sponsor,
      sponsorTeamCaptain: affiliate?.sponsorTeamCaptain,
    });
    console.log("Promo code usage:", promoCodeUsage);

    let description = `Monthly Payout for ${affiliate?.user?.first_name} ${affiliate?.user?.last_name}`;

    // Process payments and create records
    if (INCLUDE_PAYMENTS) {
      if (affiliate?.user?.stripe_connect_id && promoCodeUsage.earnings > 0) {
        console.log("Processing Stripe payout:", {
          earnings: promoCodeUsage.earnings,
          stripeConnectId: affiliate.user.stripe_connect_id,
        });
        await affiliatePayoutPayments(promoCodeUsage.earnings, affiliate.user.stripe_connect_id, description);
      }
      if (INCLUDE_PAYCHECKS) {
        await createPaycheckRecord(affiliate, promoCodeUsage.earnings, promoCodeUsage, description);
      }
    }

    if (INCLUDE_PROMO_TIER_UPDATE) {
      // Update promo code tier
      const percentage_off = determineRevenueTier(affiliate, promoCodeUsage.revenue);
      console.log("Updating promo code tier:", { percentage_off });
      await promo_services.update_promos_s({ id: affiliate.private_code._id }, { percentage_off });
    }

    // Initialize variables for email
    let giftCard = null;
    let level = null;
    let monthlyTasks = [];

    // Get monthly tasks and process rewards if sponsor
    if (INCLUDE_GIFT_CARDS && affiliate?.sponsor) {
      console.log("Processing sponsor rewards");

      const sponsorRewards = await processGiftCardRewards(affiliate, promoCodeUsage);
      ({ giftCard, level, monthlyTasks } = sponsorRewards);

      if (sponsorRewards.giftCardAmount) {
        description += ` (Including $${sponsorRewards.giftCardAmount} Gift Card for Task Completion)`;
        console.log("Added gift card to description:", description);
      }
    }

    if (INCLUDE_EMAILS) {
      // Send single earnings email with all information
      await sendAffiliateEarningsEmail({
        email: affiliate.user.email,
        affiliate,
        giftCard,
        level,
        monthlyTasks: monthlyTasks || [], // Ensure monthlyTasks is always an array
        promoCodeUsage,
      });
    }
    return "Success";
  } catch (error) {
    console.error("Error processing affiliate payout:", error);
    throw error;
  }
};
