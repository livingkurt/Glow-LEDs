import axios from "axios";
import { last_month_date_range, determine_code_tier, domain } from "../worker_helpers.js";

export const payout_affiliates = async () => {
  try {
    const domainUrl = domain();
    const { start_date, end_date } = last_month_date_range();

    const { data } = await axios.get(`${domainUrl}/api/affiliates?active=true&rave_mob=false`);
    const affiliates = data.filter(affiliate => affiliate?.active).filter(affiliate => affiliate?.user?.first_name);

    for (const affiliate of affiliates) {
      // Get last month's usage for payouts
      const { data: promo_code_usage } = await axios.get(
        `${domainUrl}/api/orders/code_usage/${affiliate?.public_code?.promo_code}?start_date=${start_date}&end_date=${end_date}&sponsor=${affiliate?.sponsor}&sponsorTeamCaptain=${affiliate?.sponsorTeamCaptain}`
      );
      console.log({
        affiliate: affiliate?.artist_name,
        if: affiliate?.user?.stripe_connect_id && promo_code_usage.earnings >= 1,
      });

      // Process payouts if eligible
      if (affiliate?.user?.stripe_connect_id && promo_code_usage.earnings >= 1) {
        console.log({
          amount: promo_code_usage.earnings,
          stripe_connect_id: affiliate?.user?.stripe_connect_id,
          description: `Monthly Payout for ${affiliate?.user?.first_name} ${affiliate?.user?.last_name}`,
        });
        await axios.post(`${domainUrl}/api/payments/payout_transfer`, {
          amount: promo_code_usage.earnings,
          stripe_connect_id: affiliate.user.stripe_connect_id,
          description: `Monthly Payout for ${affiliate.user.first_name} ${affiliate.user.last_name}`,
        });
      }

      // Create paycheck record
      console.log({
        affiliate: affiliate?._id,
        user: affiliate?.user?._id,
        amount: promo_code_usage.earnings,
        revenue: promo_code_usage.revenue,
        promo_code: affiliate?.public_code?._id,
        uses: promo_code_usage.number_of_uses,
        stripe_connect_id: affiliate?.user?.stripe_connect_id || null,
        paid: affiliate?.user?.stripe_connect_id ? true : false,
        description: `Monthly Payout for ${affiliate?.user?.first_name} ${affiliate?.user?.last_name}`,
        paid_at: new Date(),
        email: affiliate?.user?.email,
      });
      await axios.post(`${domainUrl}/api/paychecks`, {
        affiliate: affiliate?._id,
        user: affiliate?.user?._id,
        amount: promo_code_usage.earnings,
        revenue: promo_code_usage.revenue,
        promo_code: affiliate?.public_code?._id,
        uses: promo_code_usage.number_of_uses,
        stripe_connect_id: affiliate?.user?.stripe_connect_id || null,
        paid: affiliate?.user?.stripe_connect_id ? true : false,
        description: `Monthly Payout for ${affiliate?.user?.first_name} ${affiliate?.user?.last_name}`,
        paid_at: new Date(),
        email: affiliate.user.email,
        subject: "Your Glow LEDs Affiliate Earnings",
      });

      // Update promo code tier
      const percentage_off = determine_code_tier(affiliate, promo_code_usage.number_of_uses);
      await axios.put(`${domainUrl}/api/promos/${affiliate?.private_code?._id}`, {
        ...affiliate.private_code,
        percentage_off,
      });
      console.log({ percentage_off });

      // Create gift cards for sponsors
      if (affiliate.sponsor) {
        await axios.post(`${domainUrl}/api/giftcards/sponsor-benefits`, {
          userId: affiliate.user._id,
          monthlyRevenue: promo_code_usage.revenue,
        });
      }

      // Delay between each iteration
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.log("error", error);
  }
};
