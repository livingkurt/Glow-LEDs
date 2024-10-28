import axios from "axios";
import { domain } from "../server/background/worker_helpers.js";

const missingPaychecks = [
  { date: "2023-08-01", amount: 4.22, uses: 1 }, // Found in data: 1 use
  { date: "2022-10-01", amount: 10.23, uses: 2 }, // Found in data: 2 uses
  { date: "2024-05-01", amount: 8.19, uses: 2 }, // Found in data: 2 uses
  { date: "2023-02-01", amount: 17.36, uses: 2 }, // Found in data: 2 uses
  { date: "2023-06-01", amount: 2.61, uses: 1 }, // Found in data: 1 use
  { date: "2023-11-01", amount: 3.15, uses: 1 }, // Found in data: 1 use
  { date: "2023-12-01", amount: 3.15, uses: 1 }, // Found in data: 1 use
  { date: "2024-09-01", amount: 18.54, uses: 2 }, // Found in data: 2 uses
  { date: "2024-03-01", amount: 10.4, uses: 2 }, // Found in data: 2 uses
  { date: "2023-04-01", amount: 5.64, uses: 2 }, // Found in data: 2 uses
];

const createMissingPaychecks = async () => {
  try {
    const domainUrl = domain();
    const promoCode = "flowsonn";

    // First, get the affiliate data to have all necessary information
    const { data: affiliate } = await axios.get(`${domainUrl}/api/affiliates/${promoCode}/pathname`);
    console.log({ affiliate });

    console.log(`\nCreating missing paychecks for: ${promoCode}`);
    console.log("----------------------------------------");

    for (const paycheck of missingPaychecks) {
      // Create the stripe payout if they have a stripe connect ID
      if (affiliate?.user?.stripe_connect_id) {
        console.log(`Creating Stripe payout for ${paycheck.date}: $${paycheck.amount}`);

        await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
          amount: paycheck.amount,
          stripe_connect_id: affiliate.user.stripe_connect_id,
          description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
        });
      }

      // Create the paycheck record
      console.log(`Creating paycheck record for ${paycheck.date}: $${paycheck.amount}`);

      await axios.post(`${domainUrl}/api/paychecks`, {
        affiliate: affiliate._id,
        user: affiliate.user._id,
        amount: paycheck.amount,
        revenue: paycheck.amount * 10, // 10% commission rate
        promo_code: affiliate.public_code._id,
        uses: paycheck.uses, // Now using the actual number of uses
        stripe_connect_id: affiliate.user.stripe_connect_id || null,
        paid: affiliate.user.stripe_connect_id ? true : false,
        description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
        first_name: affiliate.user.first_name,
        paid_at: new Date(paycheck.date),
        email: affiliate.user.email,
        subject: "Your Glow LEDs Affiliate Earnings",
      });

      console.log("----------------------------------------");

      // Delay between each iteration
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log("\nAll missing paychecks have been created!");
  } catch (error) {
    console.error("Error creating missing paychecks:", error);
    console.error("Error details:", error.response?.data || error.message);
  }
};

// Run the creation
createMissingPaychecks();
