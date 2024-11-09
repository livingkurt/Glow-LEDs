import React from "react";
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
import { Container, Grid, Box, Tabs, Tab } from "@mui/material";
import SponsorMonthlyCheckinModal from "./components/SponsorMonthlyCheckinModal";
import { useUserProfilePage } from "./useUserProfilePage";
import useAffiliateProfilePage from "./useAffiliateProfilePage";
import { GLDisplayTable } from "../../shared/GlowLEDsComponents/GLDisplayTable";
import { months } from "../DashboardPage/dashboardHelpers";
import ProfileModes from "./components/ProfileModes";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || "profile";

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

  const handleTabChange = (event, newValue) => {
    navigate(`/secure/account/profile?tab=${newValue}`);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "modes":
        return <ProfileModes />;
      default:
        return (
          <>
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
          </>
        );
    }
  };

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

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="profile tabs">
          <Tab label="Profile" value="profile" />
          <Tab label="Modes" value="modes" />
        </Tabs>
      </Box>

      {renderTabContent()}
      <SponsorMonthlyCheckinModal />
    </Container>
  );
};
