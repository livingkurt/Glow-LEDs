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
          let payout = {};
          if (affiliate.user.stripe_connect_id) {
            const { data } = await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
              amount: affiliate.earnings,
              stripe_connect_id: affiliate.user.stripe_connect_id,
              description: `Monthly Payout for ${affiliate.first_name} ${affiliate.last_name}`
            });
            payout = data;
          }
          if (promo_code_usage.earnings) {
            await axios.post(`${domainUrl}/api/paychecks`, {
              affiliate: affiliate._id,
              amount: affiliate.earnings,
              revenue: promo_code_usage.revenue,
              promo_code: affiliate.public_code.promo_code,
              uses: promo_code_usage,
              venmo: affiliate.venmo,
              paid: payout ? true : false,
              paid_at: new Date()
            });
          }
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  }
};
