import axios from "axios";
import { get_todays_date, save_paycheck_to_expenses } from "../worker_helpers";
import { domain } from "../worker_helpers";

export const payout_employees = async () => {
  try {
    const domainUrl = domain();
    const { data } = await axios.get(
      `${domainUrl}/api/users?search=&filters=%7B"employees"%3A%5B"only_employees"%5D%7D&page=0&pageSize=10&sorting=%5B0%2C"asc"%5D`
    );
    const employees = data.data;
    employees.map(async employee => {
      if (employee?.weekly_wage && employee.stripe_connect_id) {
        await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
          amount: employee?.weekly_wage,
          stripe_connect_id: employee.stripe_connect_id,
          description: `Weekly Payout for ${employee.first_name} ${employee.last_name}`,
        });
        console.log({
          amount: employee?.weekly_wage,
          stripe_connect_id: employee.stripe_connect_id,
          description: `Weekly Payout for ${employee.first_name} ${employee.last_name}`,
        });
        await axios.post(`${domainUrl}/api/paychecks`, {
          user: employee?._id,
          amount: employee?.weekly_wage,
          stripe_connect_id: employee?.stripe_connect_id || null,
          paid: true,
          paid_at: new Date(),
        });
        console.log({
          user: employee?._id,
          amount: employee?.weekly_wage,
          stripe_connect_id: employee?.stripe_connect_id || null,
          paid: true,
          paid_at: new Date(),
        });
        const data = {
          expense_name: `${employee.first_name} ${employee.last_name} Paycheck`,
          place_of_purchase: "Stripe",
          date_of_purchase: get_todays_date(),
          category: "Employee Paycheck",
          card: "Stripe",
          amount: employee?.weekly_wage || 0, // ensure that Amount is a number and not undefined
        };
        save_paycheck_to_expenses(data);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
