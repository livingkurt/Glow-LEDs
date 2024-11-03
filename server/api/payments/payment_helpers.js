import Stripe from "stripe";
import config from "../../config.js";
import User from "../users/user.js";

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

export const checkBalanceAndPayout = async () => {
  try {
    console.log("Starting checkBalanceAndPayout...");
    // Keep MINIMUM_PAYOUT_AMOUNT as a fixed value to prevent too-small transfers
    const MINIMUM_PAYOUT_AMOUNT = 1500;

    // Get all employees and calculate total bi-weekly payroll
    console.log("Fetching employees...");
    const employees = await User.find({
      is_employee: true,
      deleted: false,
      weekly_wage: { $exists: true, $gt: 0 },
      stripe_connect_id: { $exists: true },
    });
    const totalBiWeeklyPayroll = employees.reduce((total, employee) => {
      return total + (employee.weekly_wage || 0) * 2;
    }, 0);
    console.log(`Found ${employees.length} employees. Total bi-weekly payroll: $${totalBiWeeklyPayroll}`);

    // Calculate days until next payroll (from 11/1/24)
    const lastPayroll = new Date("2024-11-01");
    const today = new Date();
    const daysSinceLastPayroll = Math.floor((today - lastPayroll) / (1000 * 60 * 60 * 24));
    const daysUntilNextPayroll = 14 - (daysSinceLastPayroll % 14);
    console.log(`Days until next payroll: ${daysUntilNextPayroll}`);

    // Get the account balance
    console.log("Retrieving Stripe balance...");
    const balance = await stripe.balance.retrieve();
    const availableBalance = balance.available.reduce((acc, b) => {
      return b.currency === "usd" ? acc + b.amount / 100 : acc;
    }, 0);
    console.log(`Available balance: $${availableBalance}`);

    // Calculate minimumBalance and reserveAmount based on payroll
    const minimumBalance = totalBiWeeklyPayroll * 0.5; // 50% of payroll as buffer
    const requiredReserve = totalBiWeeklyPayroll; // Full payroll as reserve
    console.log(`Required reserve amount: $${requiredReserve}`);

    // Scale reserve based on proximity to payroll
    const scaledReserve = requiredReserve * (1 + (14 - daysUntilNextPayroll) / 14);
    console.log(`Scaled reserve amount: $${scaledReserve}`);

    // Calculate potential payout amount
    const potentialPayoutAmount = availableBalance - scaledReserve;
    console.log(`Potential payout amount: $${potentialPayoutAmount}`);

    // Add near your other console.logs:
    console.log("Decision factors:", {
      sufficientBalance: availableBalance > minimumBalance + scaledReserve,
      meetsMinimumPayout: potentialPayoutAmount >= MINIMUM_PAYOUT_AMOUNT,
      payrollAmount: totalBiWeeklyPayroll,
      scaleFactor: 1 + (14 - daysUntilNextPayroll) / 14,
      minimumNeeded: minimumBalance + scaledReserve,
    });

    console.log("Calculated values:", {
      totalBiWeeklyPayroll,
      minimumBalance: `${minimumBalance} (50% of payroll)`,
      requiredReserve: `${requiredReserve} (100% of payroll)`,
      scaledReserve: `${scaledReserve} (${(1 + (14 - daysUntilNextPayroll) / 14).toFixed(2)}x of required reserve)`,
    });

    // If available balance is greater than minimum balance + required reserve
    if (availableBalance > minimumBalance + scaledReserve && potentialPayoutAmount >= MINIMUM_PAYOUT_AMOUNT) {
      console.log("Balance sufficient for payout. Creating payout...");
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
      currentBalance: availableBalance,
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
