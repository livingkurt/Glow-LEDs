import axios from "axios";
import { IUser } from "../../types/userTypes";
import { domain } from "../worker_helpers";

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
    });
  } catch (error) {
    console.log("error", error);
  }
};
