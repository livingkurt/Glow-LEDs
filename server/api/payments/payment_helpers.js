import Stripe from "stripe";
import config from "../../config.js";
import User from "../users/user.js";
import affiliate_services from "../affiliates/affiliate_services.js";
import order_services from "../orders/order_services.js";

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: "2023-08-16",
});

export const normalizeCustomerInfo = ({ shipping, paymentMethod }) => ({
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

export const normalizePaymentInfo = ({ totalPrice }) => ({
  amount: (totalPrice * 100).toFixed(0),
  currency: "usd",
  payment_method_types: ["card"],
});

const calculateAffiliatePayouts = async () => {
  console.log("🔍 Starting affiliate payout calculations...");
  try {
    const affiliates = await affiliate_services.findAll_affiliates_s({ active: true, rave_mob: false });
    if (!affiliates?.data) {
      console.warn("⚠️ No affiliate data returned from service");
      return 0;
    }

    console.log(`📊 Found ${affiliates.data.length} total affiliates`);
    const activeAffiliates = affiliates.data.filter(
      affiliate => affiliate?.active && affiliate?.user?.first_name && affiliate?.user?.stripe_connect_id
    );
    console.log(`✅ ${activeAffiliates.length} affiliates are active with Stripe accounts`);

    let expectedAffiliatePayouts = 0;
    for (const affiliate of activeAffiliates) {
      console.log(`📝 Processing ${affiliate.artist_name || "unnamed affiliate"}...`);
      const promoCodeUsage = await order_services.code_usage_orders_s(
        { promo_code: affiliate?.public_code?.promo_code },
        {
          start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0],
          end_date: new Date().toISOString().split("T")[0],
          sponsor: affiliate.sponsor,
          sponsorTeamCaptain: affiliate.sponsorTeamCaptain,
        }
      );
      const affiliateEarnings = promoCodeUsage.earnings >= 1 ? promoCodeUsage.earnings : 0;
      expectedAffiliatePayouts += affiliateEarnings;
      console.log(`💰 ${affiliate.artist_name}: $${affiliateEarnings}`);
    }

    console.log(`💵 Total expected affiliate payouts: $${expectedAffiliatePayouts}`);
    return expectedAffiliatePayouts;
  } catch (error) {
    console.error("❌ Error calculating affiliate payouts:", error);
    return 0; // Safe fallback
  }
};

const calculateEmployeePayroll = async () => {
  console.log("👥 Calculating employee payroll...");
  const employees = await User.find({
    is_employee: true,
    deleted: false,
    weekly_wage: { $exists: true, $gt: 0 },
    stripe_connect_id: { $exists: true },
  });

  console.log(`👤 Found ${employees.length} active employees`);
  const totalBiWeeklyPayroll = employees.reduce((total, employee) => {
    return total + (employee.weekly_wage || 0) * 2;
  }, 0);

  console.log(`💰 Total bi-weekly payroll: $${totalBiWeeklyPayroll}`);
  return totalBiWeeklyPayroll;
};

const calculatePayoutDates = () => {
  console.log("📅 Calculating payout dates...");
  const today = new Date();

  // Calculate affiliate payout date
  const nextAffiliatePayoutDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const daysUntilAffiliatePayout = Math.ceil((nextAffiliatePayoutDate - today) / (1000 * 60 * 60 * 24));

  // Calculate payroll date
  const daysUntilNextPayroll = 14 - (Math.floor((today - new Date("2024-11-01")) / (1000 * 60 * 60 * 24)) % 14);

  // Get the earlier date
  const daysUntilNextPayout = Math.min(daysUntilNextPayroll, daysUntilAffiliatePayout);

  console.log(`📆 Days until next payroll: ${daysUntilNextPayroll}`);
  console.log(`📆 Days until affiliate payout: ${daysUntilAffiliatePayout}`);
  console.log(`📆 Using ${daysUntilNextPayout} days for calculations`);

  return { daysUntilNextPayroll, daysUntilAffiliatePayout, daysUntilNextPayout };
};

const calculateReserveRequirements = (totalBiWeeklyPayroll, expectedAffiliatePayouts, daysUntilNextPayout) => {
  console.log("🏦 Calculating reserve requirements...");

  const minimumBalance = totalBiWeeklyPayroll * 0.5;
  const requiredReserve = totalBiWeeklyPayroll + expectedAffiliatePayouts;
  const scaledReserve = requiredReserve * (1 + (14 - daysUntilNextPayout) / 14);

  console.log(`💰 Minimum balance required: $${minimumBalance}`);
  console.log(`💰 Base reserve required: $${requiredReserve}`);
  console.log(`💰 Scaled reserve required: $${scaledReserve}`);

  return { minimumBalance, requiredReserve, scaledReserve };
};

const getStripeBalance = async () => {
  console.log("💳 Retrieving Stripe balance details...");
  const balance = await stripe.balance.retrieve();

  // Get available balance
  const availableBalance = balance.available.reduce((acc, b) => {
    return b.currency === "usd" ? acc + b.amount / 100 : acc;
  }, 0);

  // Get pending balance (on the way to bank)
  const pendingBalance = balance.pending.reduce((acc, b) => {
    return b.currency === "usd" ? acc + b.amount / 100 : acc;
  }, 0);

  // Get existing payouts in transit
  const existingPayouts = await stripe.payouts.list({
    status: "in_transit",
    limit: 10,
  });
  const inTransitAmount = existingPayouts.data.reduce((acc, payout) => acc + payout.amount / 100, 0);

  console.log({
    availableBalance: `$${availableBalance}`,
    pendingBalance: `$${pendingBalance}`,
    inTransitAmount: `$${inTransitAmount}`,
    actualAvailableBalance: `$${availableBalance - inTransitAmount}`,
  });

  return {
    availableBalance,
    pendingBalance,
    inTransitAmount,
    actualAvailableBalance: availableBalance - inTransitAmount,
  };
};

export const checkBalanceAndPayout = async () => {
  try {
    console.log("🚀 Starting checkBalanceAndPayout...");
    const MINIMUM_PAYOUT_AMOUNT = 1500;

    console.log("💳 Retrieving Stripe balance...");
    const balanceInfo = await getStripeBalance();
    const { actualAvailableBalance } = balanceInfo;

    // Calculate all components
    const expectedAffiliatePayouts = await calculateAffiliatePayouts();
    const totalBiWeeklyPayroll = await calculateEmployeePayroll();
    const { daysUntilNextPayroll, daysUntilNextPayout } = calculatePayoutDates();

    console.log(`💵 Available balance: $${actualAvailableBalance}`);

    // Calculate reserves
    const { minimumBalance, requiredReserve, scaledReserve } = calculateReserveRequirements(
      totalBiWeeklyPayroll,
      expectedAffiliatePayouts,
      daysUntilNextPayout
    );

    // Calculate potential payout
    const potentialPayoutAmount = actualAvailableBalance - scaledReserve;
    console.log(`💸 Potential payout amount: $${potentialPayoutAmount}`);

    // Decision logging
    console.log("🔍 Payout decision factors:", {
      sufficientBalance: actualAvailableBalance > minimumBalance + scaledReserve,
      meetsMinimumPayout: potentialPayoutAmount >= MINIMUM_PAYOUT_AMOUNT,
      currentBalance: `$${actualAvailableBalance}`,
      minimumNeeded: `$${minimumBalance + scaledReserve}`,
    });

    // If available balance is greater than minimum balance + required reserve
    if (actualAvailableBalance > minimumBalance + scaledReserve && potentialPayoutAmount >= MINIMUM_PAYOUT_AMOUNT) {
      console.log("Balance sufficient for payout. Creating payout...");
      // const payout = {
      //   amount: Math.round(potentialPayoutAmount * 100), // Convert to cents
      //   currency: "usd",
      //   method: "standard", // Use standard 2-3 day payout speed
      //   metadata: {
      //     automated_payout: "true",
      //     reserve_amount: requiredReserve.toString(),
      //     minimum_balance: minimumBalance.toString(),
      //   },
      // };
      // Create payout
      const payout = await stripe.payouts.create({
        amount: Math.round(potentialPayoutAmount * 100), // Convert to cents
        currency: "usd",
        method: "standard", // Use standard 2-3 day payout speed
        metadata: {
          automated_payout: "true",
          reserve_amount: requiredReserve.toString(),
          minimum_balance: minimumBalance.toString(),
        },
      });
      console.log("Payout created successfully:", { payout });

      return {
        success: true,
        message: "Payout initiated successfully",
        payout: payout,
        amount: potentialPayoutAmount,
        payrollInfo: {
          nextPayrollAmount: totalBiWeeklyPayroll,
          daysUntilNextPayroll,
          requiredReserve,
        },
      };
    }

    console.log("Balance insufficient for payout");
    return {
      success: false,
      message: "Balance not sufficient for payout",
      currentBalance: actualAvailableBalance,
      minimumRequired: minimumBalance + requiredReserve,
      payrollInfo: {
        nextPayrollAmount: totalBiWeeklyPayroll,
        daysUntilNextPayroll,
        requiredReserve,
      },
    };
  } catch (error) {
    console.error("Error in checkBalanceAndPayout:", error);
    throw error;
  }
};
