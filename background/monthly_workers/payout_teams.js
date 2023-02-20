const axios = require("axios");
const { domain, get_date_range } = require("../worker_helpers");

const payout_teams = async () => {
  try {
    const domainUrl = domain();

    const { start_date, end_date } = get_date_range();
    // Get promo code usage for the previous month
    const { data: teams } = await axios.get(`${domainUrl}/api/teams?active=true&rave_mob=false`);
    await Promise.all(
      teams.map(async team => {
        const { data: promo_code_usage } = await axios.get(
          `${domain()}/api/orders/code_usage/${team.public_code.promo_code}?start_date=${start_date}&end_date=${end_date}`
        );
        console.log({ promo_code_usage });

        if (team?.captain?.stripe_connect_id && promo_code_usage.earnings >= 1) {
          console.log({
            amount: promo_code_usage.earnings,
            stripe_connect_id: team.captain.stripe_connect_id,
            description: `Monthly Payout for ${team.team_name}`
          });
          await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
            amount: promo_code_usage.earnings,
            stripe_connect_id: team.captain.stripe_connect_id,
            description: `Monthly Payout for ${team.team_name}`
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
          paid_at: new Date()
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
          paid_at: new Date()
        });
      })
    );
  } catch (error) {
    console.log("error", error);
  }
};

module.exports.payout_teams = payout_teams;
