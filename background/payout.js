const axios = require("axios");
const { CommonActionsControllerApi } = require("mailslurp-client");
const { domain, get_date_range, determine_code_tier } = require("./worker_helpers");

module.exports = {
  payout_affiliates: async () => {
    try {
      const domainUrl = domain();

      const { start_date, end_date } = get_date_range();
      // Get promo code usage for the previous month
      const { data: affiliates } = await axios.get(`${domainUrl}/api/affiliates?active=true&rave_mob=false`);
      await Promise.all(
        affiliates.affiliates.map(async affiliate => {
          const { data: promo_code_usage } = await axios.get(
            `${domain()}/api/orders/code_usage/${affiliate.public_code.promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${
              affiliate.sponsor
            }`
          );

          if (affiliate?.user?.stripe_connect_id && promo_code_usage.earnings >= 1) {
            console.log({
              amount: promo_code_usage.earnings,
              stripe_connect_id: affiliate.user.stripe_connect_id,
              description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`
            });
            await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
              amount: promo_code_usage.earnings,
              stripe_connect_id: affiliate.user.stripe_connect_id,
              description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`
            });
          }
          console.log({
            affiliate: affiliate?._id,
            user: affiliate?.user?._id,
            amount: promo_code_usage.earnings,
            revenue: promo_code_usage.revenue,
            promo_code: affiliate?.public_code?._id,
            uses: promo_code_usage.number_of_uses,
            stripe_connect_id: affiliate?.user?.stripe_connect_id || null,
            paid: affiliate?.user?.stripe_connect_id ? true : false,
            paid_at: new Date()
          });
          await axios.post(`${domainUrl}/api/paychecks`, {
            affiliate: affiliate?._id,
            user: affiliate?.user?._id,
            amount: promo_code_usage.earnings,
            revenue: promo_code_usage.revenue,
            promo_code: affiliate?.public_code?._id,
            uses: promo_code_usage.number_of_uses,
            stripe_connect_id: affiliate?.user?.stripe_connect_id || null,
            paid: affiliate?.user?.stripe_connect_id ? true : false,
            paid_at: new Date()
          });
          const percentage_off = determine_code_tier(affiliate, promo_code_usage.number_of_uses);
          await axios.put(`${domainUrl}/api/promos/${affiliate.private_code._id}`, {
            ...affiliate.private_code,
            percentage_off
          });
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  },
  payout_teams: async () => {
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
  },
  refresh_sponsor_codes: async () => {
    try {
      const domainUrl = domain();

      await axios.put(`${domainUrl}/api/promos/refresh_sponsor_codes`);
    } catch (error) {
      console.log("error", error);
    }
  },
  payout_tips: async () => {
    try {
      const domainUrl = domain();

      const { start_date, end_date } = get_date_range();
      const { data: user } = await axios.get(`${domainUrl}/api/users/5f93cb1e7f9e40002a736df7`);

      const { data: tips } = await axios.get(`${domain()}/api/orders/get_range_tips_orders?start_date=${start_date}&end_date=${end_date}`);

      console.log({
        amount: tips[0].total_tips,
        stripe_connect_id: user.stripe_connect_id,
        description: `Tips Payout ${user.first_name} ${user.last_name}`
      });

      await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
        amount: tips[0].total_tips,
        stripe_connect_id: user.stripe_connect_id,
        description: `Tips Payout ${user.first_name} ${user.last_name}`
      });
      console.log({
        user: user?._id,
        amount: tips[0].total_tips,
        stripe_connect_id: user?.stripe_connect_id || null,
        paid: true,
        paid_at: new Date()
      });
      await axios.post(`${domainUrl}/api/paychecks`, {
        user: user?._id,
        amount: tips[0].total_tips,
        stripe_connect_id: user?.stripe_connect_id || null,
        paid: true,
        paid_at: new Date()
      });
    } catch (error) {
      console.log("error", error);
    }
  }
};
