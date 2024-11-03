import axios from "axios";
import { last_month_date_range, determine_code_tier, domain } from "../worker_helpers.js";
import { months } from "../../utils/util.js";

export const payout_affiliates = async () => {
  try {
    const domainUrl = domain();
    const { start_date, end_date } = last_month_date_range();
    const today = new Date();
    const currentMonth = months[today.getMonth()].toLowerCase();
    const currentYear = today.getFullYear();

    // Get all active affiliates
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
      // Create paycheck record
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

      // Process sponsor benefits if applicable
      if (affiliate.sponsor) {
        // Initialize this month's benefits
        let currentBenefits = {
          month: currentMonth,
          year: currentYear,
          generalGiftCardBalance: 25, // Base monthly $25 gift card
          suppliesGiftCardBalance: 34.99, // Base monthly supplies gift card
          performanceBonus: 0,
          lastRolloverMonth: currentMonth,
        };

        // Calculate performance bonuses
        const monthlyRevenue = promo_code_usage.revenue || 0;
        if (monthlyRevenue >= 10000) {
          currentBenefits.performanceBonus = 25;
        } else if (monthlyRevenue >= 8000) {
          currentBenefits.performanceBonus = 10;
        }

        // Process rollovers from previous months
        const previousBenefits = affiliate.sponsorBenefits || [];
        if (previousBenefits.length > 0) {
          // Sort by date to get the most recent benefits
          const sortedBenefits = previousBenefits.sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return months.indexOf(b.month) - months.indexOf(a.month);
          });

          // Get benefits from last 3 months
          const recentBenefits = sortedBenefits.slice(0, 3);

          // Add unused balances from eligible months
          recentBenefits.forEach(benefit => {
            currentBenefits.generalGiftCardBalance += benefit.generalGiftCardBalance || 0;
            currentBenefits.suppliesGiftCardBalance += benefit.suppliesGiftCardBalance || 0;
          });

          // Cap rollovers at 3 months worth
          currentBenefits.generalGiftCardBalance = Math.min(currentBenefits.generalGiftCardBalance, 75);
          currentBenefits.suppliesGiftCardBalance = Math.min(currentBenefits.suppliesGiftCardBalance, 104.97);
        }

        // Update affiliate with new benefits
        await axios.put(`${domainUrl}/api/affiliates/${affiliate._id}`, {
          sponsorBenefits: [...previousBenefits, currentBenefits],
        });
      }

      // Delay between each iteration
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return { message: "Affiliate payouts and benefits processed successfully" };
  } catch (error) {
    console.error("Error processing affiliate payouts and benefits:", error);
    throw error;
  }
};
