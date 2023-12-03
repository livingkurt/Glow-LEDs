import axios from "axios";
import { last_month_date_range, get_todays_date, domain } from "../worker_helpers";

export const payout_teams = async () => {
  try {
    const domainUrl = domain();
    const { start_date, end_date } = last_month_date_range();
    const { data } = await axios.get(`${domainUrl}/api/teams?active=true&rave_mob=false`);
    const teams = data.teams;

    for (const team of teams) {
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
        await axios.post(`${domainUrl}/api/expenses`, {
          expense_name: `${team.team_name} Team Earnings`,
          date_of_purchase: get_todays_date(),
          amount: promo_code_usage.earnings,
          place_of_purchase: "Stripe",
          card: "Stripe",
          category: "Team Paycheck",
        });
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
        first_name: team?.captain?.first_name,
        email: team?.captain?.email,
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
        email: team?.captain?.email,
        subject: "Your Glow LEDs Team Earnings",
      });
      // Delay between each iteration
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
    }
  } catch (error) {
    console.log("error", error);
  }
};
