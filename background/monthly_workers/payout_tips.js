const axios = require("axios");
const { domain, get_date_range } = require("../worker_helpers");

const payout_tips = async () => {
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
};

module.exports.payout_tips = payout_tips;
