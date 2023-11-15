import React from "react";
import { useSelector } from "react-redux";
import { determine_code_tier } from "../../DashboardPage/background/worker_helpers";
import { determine_terms_link } from "../profileHelpers";
import useClipboard from "react-hook-clipboard";
import { Box, Button } from "@mui/material";

const ProfileAffiliateMetrics = () => {
  const [clipboard, copyToClipboard] = useClipboard();
  const userPage = useSelector(state => state.users.userPage);
  const { user } = userPage;

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { month_earnings, loading_month_earnings } = affiliatePage;
  const teamPage = useSelector(state => state.teams.teamPage);
  const { team } = teamPage;

  const promoPage = useSelector(state => state.promos.promoPage);
  const { refreshCode, twentyFiveOffCode } = promoPage;

  const entity = user.is_affiliated && team?.team_name?.length > 0 ? team : user?.affiliate;

  const { public_code, private_code } = entity;

  return (
    <div className="group_item w-100per">
      {public_code && (
        <div className="mb-20px ">
          <h2 className="group_images">Affiliate Metrics</h2>
          <div className="mb-20px">
            <h3>Public Code</h3>
            <label>{public_code.promo_code.toUpperCase()}</label>
          </div>
          <div className="mb-20px">
            <h3>Private Code</h3>
            <label>{private_code.promo_code.toUpperCase()}</label>
          </div>
          {entity?.artist_name && (
            <div className="mb-20px">
              <h3>Projected Private Code Discount</h3>
              <label>
                {!loading_month_earnings && determine_code_tier(entity, month_earnings.number_of_uses)}% Off
              </label>
            </div>
          )}
          {entity?.sponsor && (
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
            <label>https://www.glow-leds.com?code={public_code.promo_code.toUpperCase()}</label>
          </div>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => copyToClipboard(`https://www.glow-leds.com?code=${public_code.promo_code.toUpperCase()}`)}
            >
              Copy Link to Clipboard
            </Button>
            <a
              href={determine_terms_link(user.affiliate)}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-10px"
            >
              <Button variant="contained" color="secondary" fullWidth>
                Affiliate Terms
              </Button>
            </a>
            <a
              href={"https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained" color="secondary" fullWidth>
                Affiliate Learnings
              </Button>
            </a>
          </Box>
        </div>
      )}
    </div>
  );
};
export default ProfileAffiliateMetrics;
