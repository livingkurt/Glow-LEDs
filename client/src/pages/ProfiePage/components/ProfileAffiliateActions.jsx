import React from "react";
import { useSelector } from "react-redux";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import { determine_code_tier } from "../../DashboardPage/background/worker_helpers";
import { determine_terms_link } from "../profileHelpers";
import useClipboard from "react-hook-clipboard";

const ProfileAffiliateMetrics = () => {
  const [clipboard, copyToClipboard] = useClipboard();
  const userPage = useSelector(state => state.users.userPage);
  const { user } = userPage;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { month_earnings, loading_month_earnings } = affiliatePage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { refreshCode, twentyFiveOffCode } = promoPage;

  return (
    <div className="group_item w-100per">
      {user.is_affiliated && user.affiliate && user.affiliate.public_code && (
        <div className="mb-20px ">
          <h2 className="group_images">Affiliate Metrics</h2>
          <div className="mb-20px">
            <h3>Public Code</h3>
            <label>{user.affiliate && user.affiliate.public_code.promo_code.toUpperCase()}</label>
          </div>
          <div className="mb-20px">
            <h3>Private Code</h3>
            <label>{user.affiliate && user.affiliate.private_code.promo_code.toUpperCase()}</label>
          </div>
          <div className="mb-20px">
            <h3>Projected Private Code Discount</h3>
            <label>{!loading_month_earnings && determine_code_tier(user.affiliate, month_earnings.number_of_uses)}% Off</label>
          </div>
          {user.affiliate.sponsor && (
            <>
              <div className="mb-20px">
                <h3>Monthly Sponsor Code ($25 off)</h3>
                <label>{twentyFiveOffCode?.toUpperCase()}</label>
              </div>
              <div className="mb-20px">
                <h3>Refresh Pack Sponsor Code</h3>
                <label>{refreshCode?.toUpperCase()}</label>
              </div>
            </>
          )}
          <div className="mb-20px">
            <h3>Promo Code URL</h3>
            <label>https://www.glow-leds.com?code={user.affiliate.public_code.promo_code.toUpperCase()}</label>
          </div>
          <div>
            <GLButton
              variant="primary"
              className="mv-10px mr-1rem"
              onClick={() => copyToClipboard(`https://www.glow-leds.com?code=${user.affiliate.public_code.promo_code.toUpperCase()}`)}
            >
              Copy Link to Clipboard
            </GLButton>
            <a href={determine_terms_link(user.affiliate)} target="_blank" rel="noopener noreferrer" className="mr-10px">
              <GLButton variant="primary">Affiliate Terms</GLButton>
            </a>
            <a
              href={"https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GLButton variant="primary">Affiliate Learnings</GLButton>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileAffiliateMetrics;
