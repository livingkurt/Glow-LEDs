import axios from "axios";
import { last_month_date_range, get_todays_date, save_paycheck_to_expenses } from "../worker_helpers";
import { domain } from "../../../../helpers/sharedHelpers";

export const payout_teams = async () => {
  try {
    const domainUrl = domain();

    const { start_date, end_date } = last_month_date_range();
    // Get promo code usage for the previous month
    const { data } = await axios.get(`${domainUrl}/api/teams?active=true&rave_mob=false`);
    const teams = data.teams;
    await Promise.all(
      teams.map(async team => {
        const { data: promo_code_usage } = await axios.get(
          `${domainUrl}/api/orders/code_usage/${team?.public_code?.promo_code}?start_date=${start_date}&end_date=${end_date}`
        );
        console.log({ promo_code_usage });

        if (team?.captain?.stripe_connect_id && promo_code_usage.earnings >= 1) {
          console.log({
            amount: promo_code_usage.earnings,
            stripe_connect_id: team.captain.stripe_connect_id,
            description: `Monthly Payout for ${team.team_name}`,
          });
          await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
            amount: promo_code_usage.earnings,
            stripe_connect_id: team.captain.stripe_connect_id,
            description: `Monthly Payout for ${team.team_name}`,
          });
          const data = {
            Expense: `${team.team_name} Affiliate Earnings`,
            Date: get_todays_date(),
            Amount: promo_code_usage.earnings || 0, // ensure that Amount is a number and not undefined
            "Place of Purchase": "Stripe",
            Card: "Stripe",
            Category: ["Employee Paycheck"],
          };
          save_paycheck_to_expenses(data);
        }
        console.log({
          team: team?._id,
          user: team?.captain?._id,
          amount: promo_code_usage.earnings,
          revenue: promo_code_usage.revenue,
          promo_code: team?.public_code?._id,
          uses: promo_code_usage.number_of_uses,
          stripe_connect_id: team?.captain?.stripe_connect_id || null,
          paid: team?.captain?.stripe_connect_id ? true : false,
          paid_at: new Date(),
        });
        await axios.post(`${domainUrl}/api/paychecks`, {
          team: team?._id,
          user: team?.captain?._id,
          amount: promo_code_usage.earnings,
          revenue: promo_code_usage.revenue,
          promo_code: team?.public_code?._id,
          uses: promo_code_usage.number_of_uses,
          stripe_connect_id: team?.captain?.stripe_connect_id || null,
          paid: team?.captain?.stripe_connect_id ? true : false,
          paid_at: new Date(),
        });
      })
    );
  } catch (error) {
    console.log("error", error);
  }
};
