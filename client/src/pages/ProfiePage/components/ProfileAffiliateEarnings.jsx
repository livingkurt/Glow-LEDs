import React from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../../shared/SharedComponents";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ProfileAffiliateEarnings = ({ yearlyEarnings, currentMonthEarnings }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { user } = userPage;

  const EarningsCard = ({ title, data }) => (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          Revenue: ${parseFloat(data?.revenue).toFixed(2)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Earned: ${data?.earnings.toFixed(2)}
        </Typography>
        <Typography variant="body2">Uses: {data?.number_of_uses}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {user.is_affiliated && (
        <>
          <Loading loading={yearlyEarnings.isLoading || currentMonthEarnings.isLoading}>
            {!currentMonthEarnings.isLoading && <EarningsCard title="Current Month" data={currentMonthEarnings.data} />}
            {!yearlyEarnings.isLoading && <EarningsCard title="Current Year" data={yearlyEarnings.data} />}
          </Loading>
        </>
      )}
    </div>
  );
};

export default ProfileAffiliateEarnings;
