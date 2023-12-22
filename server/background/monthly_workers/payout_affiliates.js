import axios from "axios";

import { domain } from "../worker_helpers";

export const payout_affiliates = async () => {
  try {
    const domainUrl = domain();
    await axios.post(`${domainUrl}/api/affiliates/payout`);
  } catch (error) {
    console.log("error", error);
  }
};
// export const payout_affiliates = async () => {
//   try {
//     const domainUrl = domain();

//     const { start_date, end_date } = last_month_date_range();
//     const { data } = await axios.get(`${domainUrl}/api/affiliates?active=true&rave_mob=false`);
//     const affiliates = data.data;

//     for (const affiliate of affiliates) {
//       const { data: promo_code_usage } = await axios.get(
//         `${domainUrl}/api/orders/code_usage/${affiliate?.public_code?.promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${affiliate.sponsor}`
//       );
// console.log({
//   affiliate: affiliate?.artist_name,
//   if: affiliate?.user?.stripe_connect_id && promo_code_usage.earnings >= 1,
// });

//       if (affiliate?.user?.stripe_connect_id && promo_code_usage.earnings >= 1) {
//         console.log({
//           amount: promo_code_usage.earnings,
//           stripe_connect_id: affiliate.user.stripe_connect_id,
//           description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
//         });
//         await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
//           amount: promo_code_usage.earnings,
//           stripe_connect_id: affiliate.user.stripe_connect_id,
//           description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
//         });
//       }
// console.log({
//   affiliate: affiliate?._id,
//   user: affiliate?.user?._id,
//   amount: promo_code_usage.earnings,
//   revenue: promo_code_usage.revenue,
//   promo_code: affiliate?.public_code?._id,
//   uses: promo_code_usage.number_of_uses,
//   stripe_connect_id: affiliate?.user?.stripe_connect_id || null,
//   paid: affiliate?.user?.stripe_connect_id ? true : false,
//   description: `Monthly Payout for ${affiliate?.user.first_name} ${affiliate?.user.last_name}`,
//   paid_at: new Date(),
//   email: affiliate.user.email,
// });
//       await axios.post(`${domainUrl}/api/paychecks`, {
//         affiliate: affiliate?._id,
//         user: affiliate?.user?._id,
//         amount: promo_code_usage.earnings,
//         revenue: promo_code_usage.revenue,
//         promo_code: affiliate?.public_code?._id,
//         uses: promo_code_usage.number_of_uses,
//         stripe_connect_id: affiliate?.user?.stripe_connect_id || null,
//         paid: affiliate?.user?.stripe_connect_id ? true : false,
//         description: `Monthly Payout for ${affiliate?.user.first_name} ${affiliate?.user.last_name}`,
//         first_name: affiliate.user?.first_name,
//         paid_at: new Date(),
//         email: affiliate.user.email,
//         subject: "Your Glow LEDs Affiliate Earnings",
//       });
// const percentage_off = determine_code_tier(affiliate, promo_code_usage.number_of_uses);
//       await axios.put(`${domainUrl}/api/promos/${affiliate?.private_code?._id}`, {
//         ...affiliate.private_code,
//         percentage_off,
//       });

//       // Delay between each iteration
//       await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };
