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

const createPaycheckRecord = async (affiliate, earnings, promoCodeUsage, description) => {
  console.log("Creating paycheck record:", {
    affiliate: affiliate?._id,
    earnings,
    promoCodeUsage,
  });

  if (!affiliate?._id || !affiliate?.user?._id) {
    console.error("Invalid affiliate data:", {
      affiliateId: affiliate?._id,
      userId: affiliate?.user?._id,
      artistName: affiliate?.artist_name,
    });
    throw new Error("Invalid affiliate data - missing required IDs");
  }

  // Check for recent paycheck to prevent duplicates
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const existingPaycheck = await paycheck_services.findOne_paychecks_s({
    affiliate: affiliate._id,
    amount: earnings,
    created_at: { $gte: oneWeekAgo },
  });

  if (existingPaycheck) {
    console.log("Skipping duplicate paycheck:", {
      affiliate: affiliate.artist_name,
      amount: earnings,
      existingPaycheckId: existingPaycheck._id,
    });
    return existingPaycheck;
  }

  const paycheck = await paycheck_services.create_paychecks_s({
    affiliate: affiliate._id,
    user: affiliate.user._id,
    amount: earnings,
    revenue: promoCodeUsage.revenue,
    promo_code: affiliate.public_code?._id,
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

const processGiftCardRewards = async (affiliate, promoCodeUsage) => {
  console.log("Processing gift card rewards for:", {
    affiliateName: affiliate.artist_name,
    currentRevenue: promoCodeUsage.revenue,
  });

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Check for existing gift card rewards for this month
  const existingGiftCard = await affiliate.giftCardRewards?.find(
    reward => reward.month === currentMonth && reward.year === currentYear
  );

  if (existingGiftCard) {
    console.log("Gift card already issued for this month:", {
      affiliate: affiliate.artist_name,
      month: currentMonth,
      year: currentYear,
      giftCard: existingGiftCard,
    });
    return {
      giftCardAmount: existingGiftCard.amount,
      giftCard: existingGiftCard,
      level: getLevelName(existingGiftCard.amount),
      monthlyTasks: [],
    };
  }

  const monthlyTasks =
    affiliate.sponsorTasks?.filter(task => task.month === currentMonth && task.year === currentYear && task.verified) ||
    [];

  const totalPoints = monthlyTasks.reduce((sum, task) => sum + task.points, 0);
  const isFullLightshow = monthlyTasks.some(task => task.isFullLightshow);

  const giftCardAmount = determineGiftCardAmount(totalPoints, promoCodeUsage.revenue, isFullLightshow);

  if (giftCardAmount === 0) {
    return { giftCardAmount: null, monthlyTasks };
  }

  const level = getLevelName(giftCardAmount);

  const giftCard = await generateGiftCard({
    amount: giftCardAmount,
  });

  // Store the gift card reward record
  if (giftCard) {
    if (!affiliate.giftCardRewards) {
      affiliate.giftCardRewards = [];
    }

    affiliate.giftCardRewards.push({
      month: currentMonth,
      year: currentYear,
      amount: giftCardAmount,
      code: giftCard.code,
      issuedAt: new Date(),
    });

    await affiliate.save();
  }

  return { giftCardAmount, giftCard, level, monthlyTasks };
};

export const payoutAffiliate = async (affiliate, start_date, end_date) => {
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
    let paycheck = null;
    if (promoCodeUsage.earnings > 0) {
      try {
        paycheck = await createPaycheckRecord(affiliate, promoCodeUsage.earnings, promoCodeUsage, description);

        // Only process Stripe payment if paycheck was newly created (not a duplicate)
        if (paycheck && !paycheck.paid && affiliate?.user?.stripe_connect_id) {
          console.log("Processing Stripe payout:", {
            earnings: promoCodeUsage.earnings,
            stripeConnectId: affiliate.user.stripe_connect_id,
          });
          await payment_controller.affiliate_payout_payments_c({
            earnings: promoCodeUsage.earnings,
            stripeConnectId: affiliate.user.stripe_connect_id,
            description,
          });

          // Update paycheck as paid
          paycheck.paid = true;
          paycheck.paid_at = new Date();
          await paycheck.save();
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        throw error;
      }
    }

    // Update promo code tier
    const percentage_off = determineRevenueTier(affiliate, promoCodeUsage.revenue);
    console.log("Updating promo code tier:", { percentage_off });
    await promo_services.update_promos_s({ id: affiliate.private_code._id }, { percentage_off });

    // Initialize variables for email
    let giftCard = null;
    let level = null;
    let monthlyTasks = [];

    // Get monthly tasks and process rewards if sponsor
    if (affiliate?.sponsor) {
      console.log("Processing sponsor rewards");

      const sponsorRewards = await processGiftCardRewards(affiliate, promoCodeUsage);
      ({ giftCard, level, monthlyTasks } = sponsorRewards);
      console.log("Sponsor rewards:", { giftCard, level, monthlyTasks });
      if (sponsorRewards.giftCardAmount) {
        description += ` (Including $${sponsorRewards.giftCardAmount} Gift Card for Task Completion)`;
        console.log("Added gift card to description:", description);
      }
    }

    // Send single earnings email with all information
    await sendAffiliateEarningsEmail({
      email: affiliate.user.email,
      affiliate,
      giftCard,
      level,
      monthlyTasks: monthlyTasks || [], // Ensure monthlyTasks is always an array
      promoCodeUsage,
    });

    return paycheck;
  } catch (error) {
    console.error("Error processing affiliate payout:", error);
    throw error;
  }
};
