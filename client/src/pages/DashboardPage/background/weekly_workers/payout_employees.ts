import axios from "axios";
import { domain, get_todays_date, save_paycheck_to_expenses } from "../worker_helpers";
import dotenv from "dotenv";
import { IUser } from "../../../../types/userTypes";
dotenv.config();

export const payout_employees = async (): Promise<void> => {
  try {
    const domainUrl = domain();
    const { data } = await axios.get(
      `${domainUrl}/api/users?search=&filters=%7B"employees"%3A%5B"only_employees"%5D%7D&page=0&pageSize=10&sorting=%5B0%2C"asc"%5D`
    );
    const employees = data.data;
    employees.map(async (employee: IUser) => {
      if (employee?.weekly_wage && employee.stripe_connect_id) {
        await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
          amount: employee?.weekly_wage,
          stripe_connect_id: employee.stripe_connect_id,
          description: `Weekly Payout for ${employee.first_name} ${employee.last_name}`
        });
        console.log({
          amount: employee?.weekly_wage,
          stripe_connect_id: employee.stripe_connect_id,
          description: `Weekly Payout for ${employee.first_name} ${employee.last_name}`
        });
        await axios.post(`${domainUrl}/api/paychecks`, {
          user: employee?._id,
          amount: employee?.weekly_wage,
          stripe_connect_id: employee?.stripe_connect_id || null,
          paid: true,
          paid_at: new Date()
        });
        console.log({
          user: employee?._id,
          amount: employee?.weekly_wage,
          stripe_connect_id: employee?.stripe_connect_id || null,
          paid: true,
          paid_at: new Date()
        });
        const data = {
          Expense: `${employee.first_name} ${employee.last_name} Paycheck`,
          Date: get_todays_date(),
          Amount: employee?.weekly_wage || 0, // ensure that Amount is a number and not undefined
          "Place of Purchase": "Stripe",
          Card: "Stripe",
          Category: ["Employee Paycheck"]
        };
        save_paycheck_to_expenses(data);
      }
    });
  } catch (error) {
    console.log({ error });
  }
};
