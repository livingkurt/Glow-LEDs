import React from "react";
import { useSelector } from "react-redux";
import { determine_terms_link } from "../profileHelpers";
import useClipboard from "react-hook-clipboard";
import { Box, Button } from "@mui/material";
import { determine_promoter_code_tier, determine_sponsor_code_tier } from "../../../utils/helper_functions";
import { Loading } from "../../../shared/SharedComponents";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ProfileAffiliateMetrics = ({ sponsorCodes, currentMonthEarnings, yearlyEarnings }) => {
  const [, copyToClipboard] = useClipboard();
  const userPage = useSelector(state => state.users.userPage);
  const { user } = userPage;

  const EarningsCard = ({ title, data }) => (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {"Earned: $"}
          {data?.earnings.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">
          {"Revenue: $"}
          {parseFloat(data?.revenue).toFixed(2)}
        </Typography>
        <Typography variant="subtitle1">
          {"Uses: "}
          {data?.number_of_uses}
        </Typography>
      </CardContent>
    </Card>
  );

  const determineTitle = () => {
    if (user.affiliate.sponsorTeamCaptain) return "Sponsor Team Captain Metrics";
    if (user.affiliate.sponsor) return "Sponsor Metrics";
    if (user.affiliate.promoter) return "Promoter Metrics";
    return "Affiliate Metrics"; // default title
  };

  return (
    <div className="group_item w-100per">
      {user.is_affiliated && user?.affiliate && user?.affiliate?.public_code && (
        <div className="mb-20px ">
          <h2 className="group_images">{determineTitle()}</h2>
          <Loading loading={yearlyEarnings.isLoading || currentMonthEarnings.isLoading}>
            {!currentMonthEarnings.isLoading && <EarningsCard title="Current Month" data={currentMonthEarnings.data} />}
            {!yearlyEarnings.isLoading && <EarningsCard title="Current Year" data={yearlyEarnings.data} />}
          </Loading>
          <div className="mb-20px">
            <h3>{"Public Code"}</h3>
            <label>{user?.affiliate?.public_code.promo_code.toUpperCase()}</label>
          </div>

          <div className="mb-20px">
            <h3>{"Private Code"}</h3>
            <label>{user?.affiliate?.private_code.promo_code.toUpperCase()}</label>
          </div>
          {user?.affiliate?.artist_name && (
            <div className="mb-20px">
              <h3>{"Projected Private Code Discount"}</h3>
              <label>
                {user?.affiliate?.sponsor
                  ? determine_sponsor_code_tier(currentMonthEarnings?.data?.number_of_uses)
                  : determine_promoter_code_tier(currentMonthEarnings?.data?.number_of_uses)}
                {"% Off"}
              </label>
            </div>
          )}
          {user?.affiliate?.sponsor && (
            <>
              <div className="mb-20px">
                <h3>{"Monthly Sponsor Code ($25 off)"}</h3>
                <label>{sponsorCodes?.data?.twentyFiveOffCode?.toUpperCase()}</label>
              </div>
              <div className="mb-20px">
                <h3>{"Refresh Pack Sponsor Code"}</h3>
                <label>{sponsorCodes?.data?.refreshCode?.toUpperCase()}</label>
              </div>
            </>
          )}

          {user?.affiliate?.sponsorTeamCaptain && (
            <>
              <div className="mb-20px">
                <h3>
                  {"You Earn "}
                  {user?.affiliate?.sponsorTeamCaptain ? "20%" : user?.affiliate?.sponsor ? "15%" : "10%"} {"on"}
                  {"Revenue Generated"}
                </h3>

                <label>
                  {"Example: $20 * 10% = $18 *"}{" "}
                  {user?.affiliate?.sponsorTeamCaptain
                    ? "20% = $3.60"
                    : user?.affiliate?.sponsor
                      ? "15% = $2.70"
                      : "10% = $2.00"}
                </label>
              </div>
            </>
          )}
          <div className="mb-20px">
            <h3>{"Promo Code URL"}</h3>
            <label>
              {"https://www.glow-leds.com?code="}
              {user?.affiliate?.public_code.promo_code.toUpperCase()}
            </label>
          </div>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() =>
                copyToClipboard(
                  `https://www.glow-leds.com?code=${user?.affiliate?.public_code.promo_code.toUpperCase()}`
                )
              }
            >
              {"Copy Link to Clipboard"}
            </Button>
            <a
              href={determine_terms_link(user.affiliate)}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-10px"
            >
              <Button variant="contained" color="secondary" fullWidth>
                {"Affiliate Terms"}
              </Button>
            </a>
            <a
              href="https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="contained" color="secondary" fullWidth>
                {"Affiliate Learnings"}
              </Button>
            </a>
          </Box>
        </div>
      )}
    </div>
  );
};
export default ProfileAffiliateMetrics;
