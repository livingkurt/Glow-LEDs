const axios = require("axios");
const { domain } = require("./worker_helpers");

module.exports = {
  payout_employees: async () => {
    try {
      const domainUrl = domain();
      const { data } = await axios.get(`${domainUrl}/api/users?is_employee=true`);
      data.map(async employee => {
        if (employee.weekly_wage && employee.stripe_connect_id) {
          await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
            amount: employee.weekly_wage,
            stripe_connect_id: employee.stripe_connect_id,
            description: `Weekly Payout for ${employee.first_name} ${employee.last_name}`
          });
          await axios.post(`${domainUrl}/api/paychecks`, {
            user: employee?._id,
            amount: employee.weekly_wage,
            stripe_connect_id: employee?.stripe_connect_id || null,
            paid: true,
            paid_at: new Date()
          });
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }
};
