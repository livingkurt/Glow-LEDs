import { useSelector } from "react-redux";
import { determine_terms_link } from "../profileHelpers";
import { Loading } from "../../../shared/SharedComponents";
import { determineRevenueTier } from "../../../utils/helpers/universal_helpers";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card, CardContent } from "@mui/material";

const ProfileAffiliateMetrics = ({ sponsorCodes, currentMonthEarnings, yearlyEarnings }) => {
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
    return "Affiliate Metrics";
  };

  return (
    <Box sx={{ p: 3 }}>
      {user.is_affiliated && user?.affiliate && user?.affiliate?.public_code && (
        <Stack spacing={3}>
          <Typography variant="h5" gutterBottom>
            {determineTitle()}
          </Typography>

          <Loading loading={yearlyEarnings.isLoading || currentMonthEarnings.isLoading}>
            {!currentMonthEarnings.isLoading && <EarningsCard title="Current Month" data={currentMonthEarnings.data} />}
            {!yearlyEarnings.isLoading && <EarningsCard title="Current Year" data={yearlyEarnings.data} />}
          </Loading>

          <Box>
            <Typography variant="h6" gutterBottom>
              {"Public Code"}
            </Typography>
            <Typography>{user?.affiliate?.public_code.promo_code.toUpperCase()}</Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {"Private Code"}
            </Typography>
            <Typography>{user?.affiliate?.private_code.promo_code.toUpperCase()}</Typography>
          </Box>

          {user?.affiliate?.artist_name && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {"Projected Private Code Discount"}
              </Typography>
              <Typography>
                {determineRevenueTier(user?.affiliate, currentMonthEarnings?.data?.revenue)}
                {"% Off"}
              </Typography>
            </Box>
          )}

          {user?.affiliate?.sponsor && (
            <>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {"Monthly Sponsor Code ($25 off)"}
                </Typography>
                <Typography>{sponsorCodes?.data?.twentyFiveOffCode?.toUpperCase()}</Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  {"Refresh Pack Sponsor Code"}
                </Typography>
                <Typography>{sponsorCodes?.data?.refreshCode?.toUpperCase()}</Typography>
              </Box>
            </>
          )}

          {user?.affiliate?.sponsorTeamCaptain && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {"You Earn "}
                {user?.affiliate?.sponsorTeamCaptain ? "20%" : user?.affiliate?.sponsor ? "15%" : "10%"} {"on"}
                {" Revenue Generated"}
              </Typography>
              <Typography>
                {"Example: $20 * 10% = $18 * "}
                {user?.affiliate?.sponsorTeamCaptain
                  ? "20% = $3.60"
                  : user?.affiliate?.sponsor
                    ? "15% = $2.70"
                    : "10% = $2.00"}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography variant="h6" gutterBottom>
              {"Promo Code URL"}
            </Typography>
            <Typography>
              {"https://www.glow-leds.com?code="}
              {user?.affiliate?.public_code.promo_code.toUpperCase()}
            </Typography>
          </Box>

          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component="a"
              href="https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Affiliate Content"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              component="a"
              href={determine_terms_link(user.affiliate)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Affiliate Terms"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              component="a"
              href="https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Affiliate Learnings"}
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default ProfileAffiliateMetrics;
