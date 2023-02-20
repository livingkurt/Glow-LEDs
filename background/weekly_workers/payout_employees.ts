import axios from "axios";
import { IUser } from "../../types/userTypes";
import { domain, get_todays_date, save_paycheck_to_expenses } from "../worker_helpers";
import Airtable from "airtable";
// const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("app9vDOYXFhhQr529");
const baseId = "app1s1rBexc8nLb9s";
const tableIdOrName = "tblsCcVphzBosLDmU";
import dotenv from "dotenv";
dotenv.config();

export const payout_employees = async (): Promise<void> => {
  try {
    const domainUrl = domain();
    const { data } = await axios.get(`${domainUrl}/api/users?is_employee=true`);
    data.map(async (employee: IUser) => {
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
      }
      const data = {
        Expense: `${employee.first_name} ${employee.last_name} Paycheck`,
        Date: get_todays_date(),
        Amount: employee?.weekly_wage || 0, // ensure that Amount is a number and not undefined
        "Place of Purchase": "Stripe",
        Card: "Stripe",
        Category: ["Employee Paycheck"]
      };
      save_paycheck_to_expenses(data);
    });
  } catch (error) {
    console.log("error", error);
  }
};
