import axios from "axios";
import { get_todays_date } from "../worker_helpers.js";
import { domain } from "../worker_helpers.js";

export const payout_employees = async () => {
  try {
    const domainUrl = domain();
    const { data } = await axios.get(
      `${domainUrl}/api/users?search=&filters=%7B"employees"%3A%5B"only_employees"%5D%7D&page=0&pageSize=10&sorting=%5B0%2C"asc"%5D`
    );
    const employees = data.data;

    for (const employee of employees) {
      if (employee?.weekly_wage && employee.stripe_connect_id) {
        await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
          amount: employee?.weekly_wage,
          stripe_connect_id: employee.stripe_connect_id,
          description: `Biweekly Payout for ${employee.first_name} ${employee.last_name}`,
        });
        console.log({
          amount: employee?.weekly_wage,
          stripe_connect_id: employee.stripe_connect_id,
          description: `Biweekly Payout for ${employee.first_name} ${employee.last_name}`,
        });
        await axios.post(`${domainUrl}/api/paychecks`, {
          user: employee?._id,
          amount: employee?.weekly_wage,
          stripe_connect_id: employee?.stripe_connect_id || null,
          description: `Biweekly Payout for ${employee.first_name} ${employee.last_name}`,
          paid: true,
          paid_at: new Date(),
          first_name: employee?.first_name,
          email: employee.email,
          subject: "Your Glow LEDs Employee Earnings",
        });
        console.log({
          user: employee?._id,
          amount: employee?.weekly_wage,
          stripe_connect_id: employee?.stripe_connect_id || null,
          paid: true,
          paid_at: new Date(),
          email: employee.email,
        });
      }

      // Delay between each iteration
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
    }
  } catch (error) {
    console.log("error", error);
  }
};
