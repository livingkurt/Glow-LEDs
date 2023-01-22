const axios = require("axios");
const { domain, get_date_range } = require("./worker_helpers");

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

          if (affiliate.user.stripe_connect_id) {
            await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
              amount: promo_code_usage.earnings,
              stripe_connect_id: affiliate.user.stripe_connect_id,
              description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`
            });
          }
          await axios.post(`${domainUrl}/api/paychecks`, {
            affiliate: affiliate._id,
            user: affiliate.user._id,
            amount: promo_code_usage.earnings,
            revenue: promo_code_usage.revenue,
            promo_code: affiliate.public_code._id,
            uses: promo_code_usage.number_of_uses,
            stripe_connect_id: affiliate.user.stripe_connect_id || null,
            paid: affiliate.user.stripe_connect_id ? true : false,
            paid_at: new Date()
          });
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }
};
