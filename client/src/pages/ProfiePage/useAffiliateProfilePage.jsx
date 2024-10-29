import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import * as API from "../../api";

import "./ProfilePage.scss";
import { format_date } from "../../utils/helper_functions";

import { this_month_date_range, this_year_date_range } from "./profileHelpers";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const useAffiliateProfilePage = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { user } = userPage;

  const { start_date: month_start_date, end_date: month_end_date } = this_month_date_range();
  const { start_date: year_start_date, end_date: year_end_date } = this_year_date_range();

  const yearlyEarnings = API.useAffiliateEarningsQuery(
    {
      promo_code: user?.affiliate?.public_code?.promo_code,
      start_date: year_start_date,
      end_date: year_end_date,
      sponsor: user?.affiliate?.sponsor,
      sponsorTeamCaptain: user?.affiliate?.sponsorTeamCaptain,
    },
    {
      skip: !user?.affiliate?.public_code?.promo_code || !year_start_date || !year_end_date,
    }
  );

  const currentMonthEarnings = API.useAffiliateEarningsQuery(
    {
      promo_code: user?.affiliate?.public_code?.promo_code,
      start_date: month_start_date,
      end_date: month_end_date,
      sponsor: user?.affiliate?.sponsor,
      sponsorTeamCaptain: user?.affiliate?.sponsorTeamCaptain,
    },
    {
      skip: !user?.affiliate?.public_code?.promo_code || !month_start_date || !month_end_date,
    }
  );

  const monthlyEarnings = API.useMonthlyAffiliateEarningsQuery(
    {
      promo_code: user?.affiliate?.public_code?.promo_code,
      start_date: year_start_date,
      end_date: year_end_date,
      sponsor: user?.affiliate?.sponsor,
      sponsorTeamCaptain: user?.affiliate?.sponsorTeamCaptain,
    },
    {
      skip: !user?.affiliate?.public_code?.promo_code || !year_start_date || !year_end_date,
    }
  );

  const sponsorCodes = API.useSponsorCodesQuery(
    {
      affiliateId: user?.affiliate?._id,
    },
    {
      skip: !user?.affiliate?._id,
    }
  );

  return {
    yearlyEarnings,
    currentMonthEarnings,
    sponsorCodes,
    monthlyEarnings,
  };
};

export default useAffiliateProfilePage;
