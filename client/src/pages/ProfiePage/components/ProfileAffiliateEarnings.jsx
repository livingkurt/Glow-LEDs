import React from "react";
import { useSelector } from "react-redux";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { Loading } from "../../../shared/SharedComponents";
import { determine_code_tier } from "../../DashboardPage/background/worker_helpers";

const ProfileAffiliateEarnings = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { user, error } = userPage;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { month_earnings, year_earnings, loading_year_earnings, loading_month_earnings } = affiliatePage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { promos } = promoPage;

  return (
    <div>
      {!loading_year_earnings &&
        !loading_month_earnings &&
        user.is_affiliated &&
        user.affiliate &&
        user.affiliate.public_code &&
        promos && (
          <>
            <h2 className="ta-c">Affiliate Earnings</h2>
            <Loading loading={loading_year_earnings} error={error} />
            <Loading loading={loading_month_earnings} error={error}>
              <table className="styled-table w-100per">
                <thead>
                  <tr>
                    <th></th>
                    <th>Revenue</th>
                    <th>Earned</th>
                    <th>Uses</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: "#656a87"
                    }}
                  >
                    <th>Current Month</th>
                    <th>${!loading_month_earnings && parseFloat(month_earnings?.revenue).toFixed(2)}</th>
                    <th>
                      $
                      {!loading_month_earnings &&
                        parseFloat(user?.affiliate?.promoter ? 0.1 * month_earnings?.revenue : 0.15 * month_earnings?.revenue).toFixed(2)}
                    </th>
                    <th>{!loading_month_earnings && month_earnings?.number_of_uses}</th>
                  </tr>
                  <tr
                    style={{
                      backgroundColor: "#656a87"
                    }}
                  >
                    <th>Current Year</th>
                    <th>${!loading_year_earnings && parseFloat(year_earnings?.revenue).toFixed(2)}</th>
                    <th>
                      $
                      {!loading_year_earnings &&
                        parseFloat(user?.affiliate?.promoter ? 0.1 * year_earnings?.revenue : 0.15 * year_earnings?.revenue).toFixed(2)}
                    </th>
                    <th>{!loading_year_earnings && year_earnings?.number_of_uses}</th>
                  </tr>
                </tbody>
              </table>
            </Loading>
          </>
        )}
    </div>
  );
};

export default ProfileAffiliateEarnings;
