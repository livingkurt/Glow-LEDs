
import { useSelector } from "react-redux";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading } from "../../shared/SharedComponents";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProfilePage.scss";
import { Helmet } from "react-helmet";
import { EditUserModal } from "../UsersPage/components";
import { getProfileTitle } from "./profileHelpers";
import ProfileDetails from "./components/ProfileDetails";
import { ProfileActions } from "./components/ProfileActions";
import ProfileAffiliateMetrics from "./components/ProfileAffiliateActions";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { determineColor } from "../PaychecksPage/paychecksHelpers";
import { orderStatusColors, determineOrderColors } from "../OrdersPage/ordersPageHelpers";

import { useUserProfilePage } from "./useUserProfilePage";
import useAffiliateProfilePage from "./useAffiliateProfilePage";
import { GLDisplayTable } from "../../shared/GlowLEDsComponents/GLDisplayTable";
import { months } from "../DashboardPage/dashboardHelpers";
import ModeCard from "../ModesGridPage/components/ModeCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;
  const { first_name } = user;

  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { loading, remoteVersionRequirement } = paycheckPage;

  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading: loading_order } = orderPage;

  const { orderColumnDefs, ordersRemoteApi } = useUserProfilePage();
  const {
    paycheckColumnDefs,
    paychecksRemoteApi,
    yearlyEarnings,
    currentMonthEarnings,
    sponsorCodes,
    monthlyEarnings,
  } = useAffiliateProfilePage();

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin User Profile | Glow LEDs"}</title>
      </Helmet>
      <EditUserModal />
      {current_user?.isAdmin && (
        <GLButton variant="icon" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </GLButton>
      )}

      <div className="row">
        <h1 style={{ textAlign: "center", width: "100%" }}>{getProfileTitle(current_user, first_name, "Profile")}</h1>
      </div>
      <Loading loading={loading}></Loading>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProfileDetails />
          <ProfileActions />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileAffiliateMetrics
            sponsorCodes={sponsorCodes}
            currentMonthEarnings={currentMonthEarnings}
            yearlyEarnings={yearlyEarnings}
          />
        </Grid>

        <Grid item xs={12}>
          {user && user?.affiliate?._id && (
            <GLDisplayTable
              title="Monthly Revenue"
              rows={
                !monthlyEarnings.isLoading &&
                monthlyEarnings.data &&
                monthlyEarnings.data.length > 0 &&
                [...monthlyEarnings.data].sort((a, b) => a.month - b.month)
              }
              columnDefs={[
                { title: "Month", display: row => months[row.month - 1] },
                { title: "Number of Uses", display: row => row.number_of_uses },
                { title: "Earnings", display: row => `-$${row.earnings.toFixed(2)}` },
                { title: "Revenue", display: row => `$${row.revenue?.toFixed(2)}` },
              ]}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {user.modes && user.modes.length > 0 && (
            <>
              <Divider sx={{ my: 4, borderColor: "#fff" }} />
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="h4" align="left">
                    {"Modes by "}
                    {user.first_name} {user.last_name}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/modes", { state: { user: user._id } })}
                  >
                    {"View All Modes"}
                  </Button>
                </Box>
                <Box
                  sx={{
                    pb: 6,
                    px: 2,
                    display: "flex",
                    overflowX: "auto",
                    minWidth: "100%",
                    "&::-webkit-scrollbar": {
                      height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "4px",
                    },
                  }}
                >
                  {user.modes.map(mode => (
                    <Box
                      key={mode._id}
                      sx={{
                        minWidth: "250px",
                        maxWidth: "300px",
                        width: "100%",
                        marginRight: "20px",
                        "&:last-child": {
                          marginRight: 0,
                        },
                      }}
                    >
                      <ModeCard mode={mode} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={12}>
          {user._id && (
            <GLTableV2
              remoteApi={ordersRemoteApi}
              tableName="Orders"
              colors={Object.values(orderStatusColors)}
              enableSearch={false}
              noURLParams
              determineColor={determineOrderColors}
              namespaceScope="orders"
              namespace="orderTable"
              columnDefs={orderColumnDefs}
              loading={loading_order}
              enableRowSelect={false}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {user && user?.affiliate?._id && (
            <GLTableV2
              remoteApi={paychecksRemoteApi}
              remoteVersionRequirement={remoteVersionRequirement}
              determineColor={determineColor}
              noURLParams
              tableName="Paychecks"
              enableSearch={false}
              namespaceScope="paychecks"
              namespace="paycheckTable"
              columnDefs={paycheckColumnDefs}
              loading={loading}
              enableRowSelect={false}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
