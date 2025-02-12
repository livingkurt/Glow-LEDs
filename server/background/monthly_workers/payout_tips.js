import axios from "axios";
import { last_month_date_range, get_todays_date, save_paycheck_to_expenses } from "../worker_helpers.js";
import { domain } from "../worker_helpers.js";

export const payout_tips = async () => {
  try {
    const domainUrl = domain();

    const { start_date, end_date } = last_month_date_range();
    const { data: user } = await axios.get(`${domainUrl}/api/users/5f93cb1e7f9e40002a736df7`);
    const { data: tips } = await axios.get(
      `${domainUrl}/api/orders/get_range_tips_revenue_orders?start_date=${start_date}&end_date=${end_date}`
    );

    console.log({
      amount: tips[0].total_tips,
      stripe_connect_id: user.stripe_connect_id,
      description: `Tips Payout ${user.first_name} ${user.last_name}`,
    });

    await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
      amount: tips[0].total_tips,
      stripe_connect_id: user.stripe_connect_id,
      description: `Tips Payout ${user.first_name} ${user.last_name}`,
    });

    console.log({
      user: user?._id,
      amount: tips[0].total_tips,
      stripe_connect_id: user?.stripe_connect_id ?? null,
      paid: true,
      paid_at: new Date(),
    });
    await axios.post(`${domainUrl}/api/paychecks`, {
      user: user?._id,
      amount: tips[0].total_tips,
      stripe_connect_id: user?.stripe_connect_id ?? null,
      description: `Tips Payout for ${user.first_name} ${user.last_name}`,
      paid: true,
      paid_at: new Date(),
      first_name: user?.first_name,
      email: user.email,
      subject: "Your Glow LEDs Tip Earnings",
    });
    console.log({
      expense_name: `Tips Payout ${user.first_name} ${user.last_name}`,
      date_of_purchase: get_todays_date(),
      amount: tips[0].total_tips || 0,
      place_of_purchase: "Stripe",
      card: "Stripe",
      category: `Tip Earnings`,
    });
  } catch (error) {
    console.log("error", error);
  }
};
